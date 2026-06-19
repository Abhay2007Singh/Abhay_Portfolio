"use client";

import { useReducer, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WalletState {
  balanceA: number;
  balanceB: number;
  amount: string;
  log: LogEntry[];
  status: "idle" | "processing" | "success" | "error";
  errorMsg: string;
}

interface LogEntry {
  id: number;
  time: string;
  msg: string;
  type: "info" | "success" | "error" | "system";
}

type Action =
  | { type: "SET_AMOUNT"; value: string }
  | { type: "TRANSFER_START" }
  | { type: "TRANSFER_SUCCESS"; amount: number }
  | { type: "TRANSFER_ERROR"; msg: string }
  | { type: "RESET" };

let logId = 0;
const now = () => new Date().toLocaleTimeString("en-IN", { hour12: false });
const log = (msg: string, type: LogEntry["type"] = "info"): LogEntry => ({
  id: logId++,
  time: now(),
  msg,
  type,
});

const initialState: WalletState = {
  balanceA: 1000,
  balanceB: 500,
  amount: "250",
  log: [log("Wallet sandbox initialised. Balances loaded.", "system")],
  status: "idle",
  errorMsg: "",
};

function reducer(state: WalletState, action: Action): WalletState {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.value };

    case "TRANSFER_START":
      return {
        ...state,
        status: "processing",
        errorMsg: "",
        log: [
          ...state.log,
          log(`POST /transfer  amount=${state.amount}  idempotency_key=idem_${Date.now()}`, "info"),
          log("Redis: checking idempotency key… not found, proceeding", "info"),
          log("PostgreSQL: acquiring row-level lock on wallet_A, wallet_B", "info"),
        ],
      };

    case "TRANSFER_SUCCESS": {
      const amt = action.amount;
      return {
        ...state,
        status: "success",
        balanceA: state.balanceA - amt,
        balanceB: state.balanceB + amt,
        log: [
          ...state.log,
          log(`Debit wallet_A: −₹${amt}`, "info"),
          log(`Credit wallet_B: +₹${amt}`, "info"),
          log("PostgreSQL: transaction committed. Locks released.", "success"),
          log("Celery: dispatched ledger append task", "info"),
          log(`Transfer OK — tx_id: TX${Date.now()}`, "success"),
        ],
      };
    }

    case "TRANSFER_ERROR":
      return {
        ...state,
        status: "error",
        errorMsg: action.msg,
        log: [
          ...state.log,
          log("PostgreSQL: transaction rolled back", "error"),
          log(`Error: ${action.msg}`, "error"),
        ],
      };

    case "RESET":
      return {
        ...initialState,
        log: [log("State reset. Balances restored.", "system")],
      };

    default:
      return state;
  }
}

export default function WalletSandbox({ onLaunch }: { onLaunch: () => void }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const logEndRef = useRef<HTMLDivElement>(null);

  const handleTransfer = async () => {
    const amt = parseFloat(state.amount);
    if (isNaN(amt) || amt <= 0) {
      dispatch({ type: "TRANSFER_ERROR", msg: "Invalid amount" });
      return;
    }
    if (amt > state.balanceA) {
      dispatch({ type: "TRANSFER_START" });
      await new Promise((r) => setTimeout(r, 600));
      dispatch({
        type: "TRANSFER_ERROR",
        msg: `Insufficient funds. wallet_A balance: ₹${state.balanceA}`,
      });
      return;
    }

    dispatch({ type: "TRANSFER_START" });
    await new Promise((r) => setTimeout(r, 800));
    dispatch({ type: "TRANSFER_SUCCESS", amount: amt });

    setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const logColor: Record<LogEntry["type"], string> = {
    system: "text-muted",
    info: "text-text/70",
    success: "text-primary",
    error: "text-error",
  };

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card-2">
        <div>
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-0.5">
            OWallet
          </div>
          <h3 className="font-display text-sm font-bold text-text">
            Atomic Transfer Simulator
          </h3>
        </div>
        <button
          onClick={onLaunch}
          className="font-mono text-[10px] text-primary border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/10 transition-colors uppercase tracking-widest"
        >
          Live App ↗
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Wallets */}
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { label: "Wallet A (sender)", balance: state.balanceA, color: "text-secondary" },
              { label: "Wallet B (receiver)", balance: state.balanceB, color: "text-primary" },
            ] as const
          ).map((w) => (
            <div key={w.label} className="border border-border rounded-lg p-3 bg-card-2">
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">
                {w.label}
              </div>
              <div className={`font-display text-2xl font-bold ${w.color}`}>
                ₹{w.balance.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted">
              ₹
            </span>
            <input
              type="number"
              value={state.amount}
              onChange={(e) => dispatch({ type: "SET_AMOUNT", value: e.target.value })}
              className="w-full bg-card-2 border border-border rounded-lg pl-7 pr-3 py-2 font-mono text-sm text-text placeholder:text-muted focus:border-primary/50 focus:outline-none transition-colors"
              placeholder="Amount"
              min="1"
              disabled={state.status === "processing"}
              aria-label="Transfer amount in rupees"
            />
          </div>
          <button
            onClick={handleTransfer}
            disabled={state.status === "processing"}
            className="font-mono text-xs bg-primary text-bg px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest font-semibold"
          >
            {state.status === "processing" ? "…" : "Transfer"}
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="font-mono text-xs border border-border text-muted px-3 py-2 rounded-lg hover:border-border-2 hover:text-text transition-colors"
            aria-label="Reset wallet state"
          >
            Reset
          </button>
        </div>

        {/* Status badge */}
        <AnimatePresence mode="wait">
          {state.status !== "idle" && (
            <motion.div
              key={state.status}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`font-mono text-xs px-3 py-2 rounded border ${
                state.status === "success"
                  ? "text-primary border-primary/20 bg-primary/5"
                  : state.status === "error"
                  ? "text-error border-error/20 bg-error/5"
                  : "text-muted border-border bg-card-2"
              }`}
            >
              {state.status === "processing" && "⚙ Processing atomic transfer…"}
              {state.status === "success" && "✓ Transfer complete — ledger updated"}
              {state.status === "error" && `✗ ${state.errorMsg}`}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Log */}
        <div className="border border-border rounded-lg bg-bg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-border bg-card-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
              Transaction Log
            </span>
          </div>
          <div className="p-3 space-y-1 max-h-40 overflow-y-auto font-mono text-[11px]">
            {state.log.map((entry) => (
              <div key={entry.id} className="flex gap-2">
                <span className="text-muted shrink-0">{entry.time}</span>
                <span className={logColor[entry.type]}>{entry.msg}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
