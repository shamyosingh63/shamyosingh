import { Link } from "@tanstack/react-router";

import { useCopy } from "@/lib/i18n";
import monogram from "../assets/ss-monogram.png";

const FOOTER = {
  it: { tagline: "{c.tagline}", rights: "{c.rights}", services: "Servizi", contact: "Contatti" },
  en: { tagline: "Copywriter & content strategist. Words that tell, persuade and sell.", rights: "All rights reserved.", services: "Services", contact: "Contact" },
};

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/servizi", label: "services" },
  { to: "/pacchetti", label: "Packages" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contatti", label: "contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const c = useCopy(FOOTER);

  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img src={monogram} alt="Shamyo Singh logo" width={64} height={64} className="h-14 w-14 object-contain" />
            <div>
              <Link to="/" className="font-heading text-2xl tracking-tight text-foreground">
                Shamyo Singh
              </Link>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {c.tagline}
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label === "services" ? c.services : link.label === "contact" ? c.contact : link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Shamyo Singh. {c.rights}</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/shamyo-singh-824053304" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">LinkedIn</a>
            <a href="https://www.instagram.com/_sham_y0/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Instagram</a>
            <a href="mailto:Shamyosingh63@gmail.com" className="transition-colors hover:text-foreground">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
