import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — Alessia Rossi Copywriter" },
      { name: "description", content: "Contatta Alessia Rossi per un progetto di copywriting, brand voice o strategia editoriale. Rispondo entro 24 ore." },
      { property: "og:title", content: "Contatti — Alessia Rossi Copywriter" },
      { property: "og:description", content: "Contatta Alessia Rossi per un progetto di copywriting, brand voice o strategia editoriale." },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Brand Voice",
  "Contenuti web",
  "Copy pubblicitario",
  "Email marketing",
  "Content strategy",
  "Revisione/editing",
  "Altro",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Contatti</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Raccontami il tuo progetto
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Compila il form o scrivimi direttamente. Risponderò entro 24 ore lavorative con una proposta su misura.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl border border-border/60 bg-card/30 p-8 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-flex mx-auto h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Send className="mx-auto h-5 w-5" />
                </div>
                <h2 className="mt-6 font-heading text-2xl text-foreground">Messaggio inviato!</h2>
                <p className="mt-3 text-muted-foreground">
                  Grazie per avermi contattata. Ti risponderò al più presto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e cognome</Label>
                  <Input id="name" name="name" type="text" placeholder="Mario Rossi" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="mario@esempio.it" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Azienda / brand (opzionale)</Label>
                  <Input id="company" name="company" type="text" placeholder="Il tuo brand" />
                </div>
                <div className="space-y-3">
                  <Label>Servizi di interesse</Label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          selectedServices.includes(service)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Messaggio</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descrivimi il tuo progetto, i tuoi obiettivi e le tempistiche..."
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full bg-primary py-6 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Invia richiesta
                </Button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl text-foreground">Informazioni di contatto</h2>
                <p className="mt-3 text-muted-foreground">
                  Preferisci scrivermi direttamente? Ecco come raggiungermi.
                </p>
              </div>
              <div className="space-y-6">
                <a
                  href="mailto:hello@alessiarossi.it"
                  className="flex items-center gap-4 text-foreground transition-opacity hover:opacity-70"
                >
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base">hello@alessiarossi.it</span>
                </a>
                <a
                  href="tel:+393331234567"
                  className="flex items-center gap-4 text-foreground transition-opacity hover:opacity-70"
                >
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base">+39 333 123 4567</span>
                </a>
                <div className="flex items-start gap-4 text-foreground">
                  <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <span className="text-base">
                    Milano, Italia
                    <br />
                    <span className="text-sm text-muted-foreground">Lavoro con clienti in tutta Italia e all'estero.</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-border/60 bg-background p-8">
              <h3 className="font-heading text-xl text-foreground">Tempistiche</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Risposta a richieste</span>
                  <span className="font-medium text-foreground">Entro 24h</span>
                </li>
                <li className="flex justify-between">
                  <span>Proposta personalizzata</span>
                  <span className="font-medium text-foreground">2-3 giorni</span>
                </li>
                <li className="flex justify-between">
                  <span>Avvio progetto</span>
                  <span className="font-medium text-foreground">Su disponibilità</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
