import React from "react";
import { ExternalLink, Mail, MessageCircle, Music2 } from "lucide-react";
import { appVersion } from "../data/appVersion.js";
import { contactLinks, isEnabledLink } from "../data/contactLinks.js";

function FooterLink({ href, children, primary = false, external = true }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-4 focus:ring-amber-200/25 ${
        primary
          ? "border-amber-200/30 bg-amber-200/10 text-amber-100"
          : "border-white/10 bg-white/[0.045] text-slate-300 hover:border-cyan-200/25 hover:bg-cyan-200/10 hover:text-cyan-100"
      }`}
    >
      {children}
      {external ? <ExternalLink className="h-3 w-3" aria-hidden="true" /> : null}
    </a>
  );
}

function DisabledFooterItem({ children }) {
  return (
    <span className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs font-semibold text-slate-500 opacity-75" aria-disabled="true">
      {children}
    </span>
  );
}

export default function EcosystemFooter() {
  const hasTikTok = isEnabledLink(contactLinks.tiktok);

  return (
    <footer className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 px-4 py-4 shadow-aura backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-100">Soul of Love Ecosystem</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">ติดตามและเชื่อมต่อ Soul of Love</p>
        </div>
        <nav className="flex flex-wrap gap-2 sm:justify-end" aria-label="Soul of Love ecosystem links">
          <FooterLink href={contactLinks.lineOa.addFriendUrl} primary>
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            LINE Official
          </FooterLink>
          <FooterLink href={contactLinks.email.mailto} external={false}>
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Email
          </FooterLink>
          <FooterLink href={contactLinks.portfolio.url}>Portfolio</FooterLink>
          <FooterLink href={contactLinks.dailyEnergy.url}>Daily Energy</FooterLink>
          <FooterLink href={contactLinks.thaiWisdom.url}>ฤกษ์ดี</FooterLink>
          <FooterLink href={contactLinks.facebook.url}>Facebook</FooterLink>
          <FooterLink href={contactLinks.instagram.url}>Instagram</FooterLink>
          {hasTikTok ? (
            <FooterLink href={contactLinks.tiktok.url}>TikTok</FooterLink>
          ) : (
            <DisabledFooterItem>TikTok — Link Pending</DisabledFooterItem>
          )}
          <FooterLink href={contactLinks.youtube.url}>
            <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
            YouTube Music
          </FooterLink>
          <FooterLink href={contactLinks.suno.url}>
            <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
            Suno Music
          </FooterLink>
        </nav>
      </div>
      <div className="mt-4 border-t border-white/10 pt-3 text-center text-[0.68rem] leading-5 text-slate-500">
        <p>{appVersion.productName} · v{appVersion.version}</p>
        <p>Updated {appVersion.updatedAtDisplay}</p>
      </div>
    </footer>
  );
}
