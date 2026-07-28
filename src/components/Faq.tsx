import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Quanto costa un progetto di copywriting?",
    a: "Ogni progetto ha esigenze diverse: una landing page non è un piano editoriale. Dopo una prima call gratuita ti mando un preventivo chiaro, con scope, tempi e prezzo fisso — nessuna sorpresa in fattura.",
  },
  {
    q: "In quanto tempo consegni i testi?",
    a: "In media da 3 a 10 giorni lavorativi a seconda della complessità. Landing page singole in 3-5 giorni, progetti SEO e piani editoriali in 2-3 settimane. Le date le fissiamo insieme prima di iniziare.",
  },
  {
    q: "Lavori anche con brand piccoli o freelance?",
    a: "Sì. Lavoro con liberi professionisti, startup e PMI che hanno bisogno di parole che facciano il loro lavoro. Il metodo è lo stesso: prima ascolto, poi scrivo.",
  },
  {
    q: "Sono incluse le revisioni?",
    a: "Sempre. Ogni progetto include due giri di revisione per allineare tono di voce e messaggio. L'obiettivo non è consegnare un file, è consegnare un testo che converte.",
  },
  {
    q: "Ti occupi anche di SEO e non solo di scrittura?",
    a: "Sì: keyword research, audit SEO on-page, struttura dei contenuti e ottimizzazione di pagine già online. Scrivere bene senza farsi trovare serve a poco.",
  },
  {
    q: "Usi l'intelligenza artificiale per scrivere?",
    a: "La uso come supporto per ricerca e velocità, mai come autore. Strategia, voce e revisione finale sono sempre mie: quello che ricevi è scritto da una persona, per delle persone.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-32">
      <div className="reveal max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
        <h2 className="mt-4 font-heading text-4xl leading-[1.1] text-foreground sm:text-5xl">
          Le domande che mi fanno <em className="not-italic text-brand">più spesso</em>
        </h2>
        <p className="mt-5 text-muted-foreground sm:text-lg">
          Se non trovi la risposta che cerchi, scrivimi: rispondo entro 24 ore.
        </p>
      </div>

      <div className="reveal mt-14 divide-y divide-border/60 border-y border-border/60">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-heading text-xl text-foreground sm:text-2xl">{item.q}</span>
                <Plus
                  className={`mt-1 h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl pb-7 leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
