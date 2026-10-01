import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLang } from "@/lib/i18n";

import monogram from "../assets/ss-monogram.png";

const leftLinks: NavLink[] = [
  { to: "/about", label: "About" },
  { to: "/servizi", label: "Servizi", en: "Services" },
  { to: "/pacchetti", label: "Packages" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
];

type NavLink = { to: string; label: string; en?: string };
const label = (l: NavLink, lang: string) => (lang === "en" && l.en ? l.en : l.label);

const rightLinks: NavLink[] = [
  { to: "/contatti", label: "Contatti", en: "Contact" },
];

function MonogramLogo() {
  return (
    <Link to="/" className="group flex flex-col items-center justify-center">
      <div className="h-14 w-14 overflow-hidden rounded-full bg-background transition-transform group-hover:scale-105">
        <img
          src={monogram}
          alt="Shamyo Singh — monogramma SS"
          width={112}
          height={112}
          className="h-full w-full object-contain"
        />
      </div>
      <span className="mt-1 font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Shamyo Singh
      </span>
    </Link>
  );
}

export function Header() {
  const { lang } = useLang();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <nav className="hidden flex-1 items-center justify-start gap-8 md:flex">
          {leftLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-foreground" }}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label(link, lang)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 justify-start md:justify-center">
          <MonogramLogo />
        </div>

        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          {rightLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-foreground" }}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label(link, lang)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            to="/contatti"
            className="rounded-full bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:opacity-95"
          >
            Work together
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}

function MobileMenu() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[81px] border-b border-border bg-background px-6 py-6 shadow-sm">
          <nav className="flex flex-col gap-4">
            <LanguageSwitcher className="text-sm" />
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label(link, lang)}
              </Link>
            ))}
            <Link
              to="/contatti"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
            >
              Work together
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
