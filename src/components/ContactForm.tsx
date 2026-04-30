"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";

type Field = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY: Field = { name: "", email: "", subject: "", message: "" };

const SUBJECTS = [
  "Brand Discovery",
  "Web Design & Dev",
  "Marketing",
  "Photography",
  "Something else",
];

export default function ContactForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [fields, setFields] = useState<Field>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFields(EMPTY);
      if (onSuccess) setTimeout(onSuccess, 2000);
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-[#1f1f1f]/30 py-4 font-sans text-[16px] text-[#1f1f1f] tracking-[-0.04em] placeholder:text-[#1f1f1f]/30 focus:outline-none focus:border-[#1f1f1f] transition-colors duration-200";

  const labelBase =
    "font-mono text-[11px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em] leading-[1]";

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 py-16 items-start">
        <span className="font-mono text-[12px] text-[#1f1f1f]/50 uppercase tracking-[-0.03em]">[ Message sent ]</span>
        <p className="font-sans font-light text-[32px] md:text-[48px] text-black tracking-[-0.06em] leading-[1]">
          Thanks — I&apos;ll be in touch soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-sans text-[14px] text-[#1f1f1f]/50 underline underline-offset-4 mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className={labelBase}>Your name</label>
          <input
            type="text"
            required
            placeholder="Harvey Specter"
            value={fields.name}
            onChange={set("name")}
            className={inputBase}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className={labelBase}>Email address</label>
          <input
            type="email"
            required
            placeholder="hello@h.studio"
            value={fields.email}
            onChange={set("email")}
            className={inputBase}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label className={labelBase}>What can I help with?</label>
        <select
          value={fields.subject}
          onChange={set("subject")}
          className={`${inputBase} cursor-pointer appearance-none`}
        >
          <option value="" disabled>Select a service…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className={labelBase}>Tell me about your project</label>
        <textarea
          required
          rows={5}
          placeholder="Describe your project, goals, timeline…"
          value={fields.message}
          onChange={set("message")}
          className={`${inputBase} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="font-mono text-[12px] text-red-600 uppercase tracking-[-0.03em]">
          Something went wrong — please try again.
        </p>
      )}

      <div>
        <MagneticButton
          type="submit"
          disabled={status === "sending"}
          baseBg="#000"
          baseColor="#fff"
          hoverBg="#fff"
          hoverColor="#000"
          className="border border-black px-6 py-4 rounded-full text-[14px] font-medium tracking-[-0.04em] cursor-pointer disabled:opacity-40"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </MagneticButton>
      </div>

    </form>
  );
}
