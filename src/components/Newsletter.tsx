import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="newsletter" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card p-10 sm:p-14 lg:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              <Mail className="h-4 w-4" /> Newsletter
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              Una mail al mese.<br />
              <em className="not-italic text-brand">Zero fuffa, solo parole che funzionano.</em>
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Casi studio reali, template di copy pronti all'uso e consigli SEO che applico ogni giorno
              con i miei clienti. Niente spam, disiscrizione con un click.
            </p>
          </div>

          <div>
            {sent ? (
              <div className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand-muted p-6">
                <Check className="h-5 w-5 text-brand" />
                <p className="text-sm font-medium text-foreground">
                  Iscrizione registrata. Ci sentiamo presto, {email}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSent(true);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  La tua email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="latua@email.com"
                  className="w-full rounded-full border border-input bg-background px-6 py-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  Iscriviti
                </button>
              </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Iscrivendoti accetti di ricevere una mail mensile. I tuoi dati restano solo miei.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
