import { Link } from "@tanstack/react-router";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/servizi", label: "Servizi" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contatti", label: "Contatti" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/" className="font-heading text-2xl tracking-tight text-foreground">
              Shamyo Singh
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Copywriter & content strategist. Parole che posizionano, persuadono e vendono per brand e aziende.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Shamyo Singh. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@shamyosingh.it"
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
