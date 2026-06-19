"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  {
    label: "abhaykumar2007singh@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=abhaykumar2007singh@gmail.com",
    icon: "✉",
  },
  {
    label: "github.com/Abhay2007Singh",
    href: "https://github.com/Abhay2007Singh",
    icon: "⌥",
  },
  {
    label: "linkedin.com/in/abhay-kumar-singh-aks",
    href: "https://linkedin.com/in/abhay-kumar-singh-aks",
    icon: "◈",
  },
  { label: "Bengaluru, Karnataka, India", href: null, icon: "◎" },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Valid email is required.";
    if (!message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("sending");

    try {
      const res = await fetch("https://formspree.io/f/xrevwvny", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputCls = (field: string) =>
    `w-full bg-card-2 border rounded-lg px-4 py-2.5 font-body text-sm text-text placeholder:text-muted focus:outline-none transition-colors ${
      errors[field] ? "border-error/60 focus:border-error" : "border-border focus:border-primary/50"
    }`;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 border-t border-border"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
              09 / Contact
            </div>
            <h2
              id="contact-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-text mb-4 leading-tight"
            >
              Let&apos;s work
              <br />
              together.
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-10 max-w-sm">
              Open to backend roles, internships, and interesting problems. I reply within 24
              hours.
            </p>

            <div className="space-y-4">
              {LINKS.map((l) =>
                l.href ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-sm text-muted hover:text-text transition-colors group"
                  >
                    <span className="text-primary w-4 text-center shrink-0">{l.icon}</span>
                    <span className="group-hover:underline underline-offset-2">{l.label}</span>
                  </a>
                ) : (
                  <div key={l.label} className="flex items-center gap-3 text-sm text-muted">
                    <span className="text-muted w-4 text-center shrink-0">{l.icon}</span>
                    <span>{l.label}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {formState === "success" ? (
              <div className="border border-primary/30 rounded-xl bg-primary/5 p-8 text-center h-full flex flex-col items-center justify-center gap-4">
                <span className="text-4xl">✓</span>
                <p className="font-display text-xl font-bold text-text">Message sent!</p>
                <p className="text-sm text-muted">
                  Thanks — I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="cf-name" className="font-mono text-xs text-muted mb-1.5 block">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputCls("name")}
                    aria-describedby={errors.name ? "cf-name-err" : undefined}
                  />
                  {errors.name && (
                    <p id="cf-name-err" className="font-mono text-[11px] text-error mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="cf-email" className="font-mono text-xs text-muted mb-1.5 block">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls("email")}
                    aria-describedby={errors.email ? "cf-email-err" : undefined}
                  />
                  {errors.email && (
                    <p id="cf-email-err" className="font-mono text-[11px] text-error mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="cf-message"
                    className="font-mono text-xs text-muted mb-1.5 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={5}
                    className={`${inputCls("message")} resize-vertical min-h-[120px]`}
                    aria-describedby={errors.message ? "cf-msg-err" : undefined}
                  />
                  {errors.message && (
                    <p id="cf-msg-err" className="font-mono text-[11px] text-error mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {formState === "error" && (
                  <p className="font-mono text-[11px] text-error">
                    Something went wrong. Email me directly at abhaykumar2007singh@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-primary text-bg font-mono text-xs py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-widest font-semibold"
                >
                  {formState === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
