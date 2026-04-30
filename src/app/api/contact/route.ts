import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Wire up your email provider here (Resend, SendGrid, Nodemailer, etc.)
  // e.g. await resend.emails.send({ from: "...", to: "...", subject: `[Contact] ${subject}`, ... })
  console.log("[contact form]", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
