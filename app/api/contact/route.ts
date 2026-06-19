import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (
      !name?.trim() ||
      !email?.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message?.trim()
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["abhaykumar2007singh@gmail.com"],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact route]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
