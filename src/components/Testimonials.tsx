import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, BadgeCheck } from "lucide-react";

import av1 from "../assets/avatar-1.jpg";
import av2 from "../assets/avatar-2.jpg";
import av3 from "../assets/avatar-3.jpg";
import av4 from "../assets/avatar-4.jpg";
import av5 from "../assets/avatar-5.jpg";
import av6 from "../assets/avatar-6.jpg";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  service: string;
  quote: (string | { hl: string })[];
};

const testimonials: Testimonial[] = [
  {
    name: "Giulia Ferrante",
    role: "Marketing Director — Fenice Academy",
    avatar: av1,
    service: "Landing page + sequenza email di lancio",
    quote: [
      "Avevamo traffico ma nessuna conversione. Shamyo ha riscritto la landing e la sequenza email e in tre settimane ",
      { hl: "le iscrizioni sono cresciute del 32%" },
      ". Non ha solo scritto: ha capito il nostro pubblico meglio di noi.",
    ],
  },
  {
    name: "Marco Bellini",
    role: "Responsabile Comunicazione — Tecnocasa",
    avatar: av2,
    service: "SEO audit + contenuti per ricerca locale",
    quote: [
      "Ci ha portato ordine dove c'era caos. Struttura, parole chiave, tono di voce: ",
      { hl: "+60% di visibilità locale in quattro mesi" },
      " e finalmente un sito che parla la lingua dei nostri clienti.",
    ],
  },
  {
    name: "Sara Costanzo",
    role: "Founder — Isola del Vento",
    avatar: av3,
    service: "Content strategy & storytelling di territorio",
    quote: [
      "Cercavo qualcuno che raccontasse la nostra isola senza cliché. Ha trovato ",
      { hl: "una voce autentica e riconoscibile" },
      ", e l'engagement sui social è quasi triplicato. Lavorare con lui è stato semplice e stimolante.",
    ],
  },
  {
    name: "Alessandro Ruggeri",
    role: "Titolare — Ristorazione & Hospitality",
    avatar: av4,
    service: "Copy per sito web e campagne stagionali",
    quote: [
      "Pensavo che il copy fosse un dettaglio. Mi sbagliavo: ",
      { hl: "le prenotazioni dirette sono aumentate del 41%" },
      " senza spendere un euro in più di advertising. Chiarezza pura.",
    ],
  },
  {
    name: "Elena Marchetti",
    role: "Program Director — Terzo settore",
    avatar: av5,
    service: "Copywriting istituzionale & contenuti SEO",
    quote: [
      "Comunicare cause sociali è delicato. Shamyo ha trovato il tono giusto: ",
      { hl: "rispettoso, umano e allo stesso tempo efficace" },
      ". Il traffico organico è salito del 45% e le donazioni con esso.",
    ],
  },
  {
    name: "Davide Ottaviani",
    role: "Co-founder — Swag Marketing",
    avatar: av6,
    service: "Brand voice e contenuti B2B",
    quote: [
      "Lo consiglio a occhi chiusi. Non consegna testi: consegna strategia. ",
      { hl: "I lead qualificati sono cresciuti del 50%" },
      " e il nostro posizionamento è finalmente distinguibile dai competitor.",
    ],
  },
];

const AUTOPLAY_MS = 6500;

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label="5 stelle su 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-brand text-brand" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = testimonials.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // touch swipe
  const startX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      id="testimonianze"
      className="relative overflow-hidden border-y border-border/50 bg-card/30 py-20 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-foreground/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="reveal flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Testimonianze</p>
          <h2 className="mt-4 max-w-2xl font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Chi mi ha scelto, <em className="not-italic text-brand">poi è tornato.</em>
          </h2>
        </div>

        {/* Rating badge */}
        <div className="reveal mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur-md sm:flex-row sm:justify-center sm:gap-8 sm:p-7">
          <div className="flex items-center gap-4">
            <span className="font-heading text-5xl leading-none text-foreground">4.7</span>
            <div>
              <Stars />
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">su 5 — media</p>
            </div>
          </div>
          <div className="hidden h-12 w-px bg-border sm:block" />
          <div className="flex items-center gap-2 text-center sm:text-left">
            <BadgeCheck className="h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm leading-snug text-muted-foreground">
              Basata su <span className="font-semibold text-foreground">1.864 recensioni</span> verificate
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-[2rem]">
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{ transform: `translate3d(-${index * 100}%,0,0)` }}
            >
              {testimonials.map((t, i) => (
                <article
                  key={t.name}
                  aria-hidden={i !== index}
                  className="w-full shrink-0 px-1"
                >
                  <div className="mx-auto grid gap-8 rounded-[2rem] border border-border/60 bg-background p-8 shadow-xl sm:p-12 md:grid-cols-[auto_1fr] md:items-start">
                    <div className="relative mx-auto md:mx-0">
                      <div className="h-24 w-24 overflow-hidden rounded-2xl shadow-lg ring-1 ring-border sm:h-28 sm:w-28">
                        <img
                          src={t.avatar}
                          alt={`${t.name}, cliente di Shamyo Singh`}
                          width={512}
                          height={512}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Quote className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-brand p-1.5 text-brand-foreground shadow-md" />
                    </div>

                    <div className="text-center md:text-left">
                      <Stars className="justify-center md:justify-start" />
                      <blockquote className="mt-5 font-heading text-2xl leading-snug text-foreground sm:text-3xl">
                        “
                        {t.quote.map((part, k) =>
                          typeof part === "string" ? (
                            <span key={k}>{part}</span>
                          ) : (
                            <mark key={k} className="bg-brand-muted px-1 text-brand">
                              {part.hl}
                            </mark>
                          ),
                        )}
                        ”
                      </blockquote>
                      <div className="mt-7 border-t border-border/60 pt-5">
                        <p className="font-semibold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                        <p className="mt-3 inline-flex rounded-full bg-card px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {t.service}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Testimonianza precedente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-brand-foreground active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Vai alla testimonianza ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-brand" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Testimonianza successiva"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-brand-foreground active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
