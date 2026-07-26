import { useEffect, useState } from "react";

const items = [
  "brand che vogliono farsi ricordare",
  "landing page che convertono davvero",
  "sequenze email che creano relazioni",
  "contenuti SEO che portano clienti",
  "storytelling che vende senza urlare",
  "aziende stanche di parole inutili",
];

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1900;

export function TypingServices() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(items[index]);
      const id = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), 2600);
      return () => window.clearTimeout(id);
    }

    const full = items[index];
    let id: number;

    if (phase === "typing") {
      if (text.length < full.length) {
        id = window.setTimeout(() => setText(full.slice(0, text.length + 1)), TYPE_MS);
      } else {
        id = window.setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      id = window.setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        id = window.setTimeout(() => setText(full.slice(0, text.length - 1)), DELETE_MS);
      } else {
        setIndex((i) => (i + 1) % items.length);
        setPhase("typing");
        return;
      }
    }
    return () => window.clearTimeout(id);
  }, [text, phase, index]);

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-primary py-24 text-primary-foreground lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand/30 blur-3xl animate-float" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl animate-float-slow" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
          Con chi lavoro
        </p>
        <h2 className="mt-6 font-heading text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">
          Serving up strategy for
        </h2>
        <p
          className="mx-auto mt-8 flex min-h-[3.5rem] max-w-3xl items-center justify-center font-heading text-2xl text-brand-foreground sm:min-h-[4.5rem] sm:text-4xl lg:text-5xl"
          aria-live="polite"
        >
          <span className="text-primary-foreground/95">{text}</span>
          <span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.08em] bg-brand animate-caret" />
        </p>
      </div>
    </section>
  );
}
