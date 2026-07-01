import React from "react";
import { CircleAlert, Copy, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { contactLinks, isConfiguredEmail, isConfiguredUrl, isEnabledLink } from "../data/contactLinks.js";

export function LineAction({ onCopyLine, copied, className = "", children = "LINE Official" }) {
  if (isConfiguredUrl(contactLinks.lineOa.addFriendUrl)) {
    return (
      <a
        href={contactLinks.lineOa.addFriendUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${contactLinks.lineOa.label} ${contactLinks.lineOa.id}`}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-cyan-200 px-4 py-2 text-sm font-black text-slate-950 shadow-gold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-200/40 ${className}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {children}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onCopyLine}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-cyan-200 px-4 py-2 text-sm font-black text-slate-950 shadow-gold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-200/40 ${className}`}
      aria-label={`Copy LINE Official ID ${contactLinks.lineOa.id}`}
    >
      <Copy className="h-4 w-4" aria-hidden="true" />
      {copied ? "คัดลอก LINE ID แล้ว" : children}
    </button>
  );
}

export function CopyLineIdAction({ onCopyLine, copied, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onCopyLine}
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-200/30 hover:bg-cyan-200/10 hover:text-cyan-100 focus:outline-none focus:ring-4 focus:ring-cyan-200/25 ${className}`}
      aria-label={`Copy LINE Official ID ${contactLinks.lineOa.id}`}
      aria-live="polite"
    >
      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      {copied ? "คัดลอก LINE ID แล้ว" : children || `คัดลอก ${contactLinks.lineOa.id}`}
    </button>
  );
}

export function EmailAction({ className = "", children = "Email / Contact" }) {
  if (isConfiguredEmail(contactLinks.email.address)) {
    return (
      <a
        href={contactLinks.email.mailto}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-200/15 focus:outline-none focus:ring-4 focus:ring-cyan-200/25 ${className}`}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {children}
      </a>
    );
  }

  return (
    <span
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-slate-400 ${className}`}
      aria-label="Email contact is not configured yet"
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      Email จะเพิ่มภายหลัง
    </span>
  );
}

export function SupportEmailAction({ className = "", children = "แจ้งปัญหาการใช้งาน Matrix 9" }) {
  if (!isConfiguredEmail(contactLinks.email.address)) {
    return (
      <span className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-semibold text-slate-400 ${className}`}>
        <CircleAlert className="h-4 w-4" aria-hidden="true" />
        Support Email จะเพิ่มภายหลัง
      </span>
    );
  }

  return (
    <a
      href={contactLinks.email.supportMailto}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-fuchsia-200/25 bg-fuchsia-200/10 px-3 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-200/15 focus:outline-none focus:ring-4 focus:ring-fuchsia-200/25 ${className}`}
    >
      <CircleAlert className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}

export function ExternalContactLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-200/35 hover:bg-amber-200/10 hover:text-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-200/25 ${className}`}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export function ConfiguredExternalLink({ item, children, disabledText, className = "" }) {
  if (isEnabledLink(item)) {
    return (
      <ExternalContactLink href={item.url} className={className}>
        {children || item.label}
      </ExternalContactLink>
    );
  }

  return (
    <span className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-slate-500 ${className}`}>
      {disabledText || `${item.label} — Coming Soon`}
    </span>
  );
}
