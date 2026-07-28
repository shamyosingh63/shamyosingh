import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import video from "../assets/writing-loop.mp4";
import poster from "../assets/writing-poster.jpg";

export function VideoBand() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={poster}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <video
          ref={ref}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-8 lg:py-40">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-background/70">
          Il mestiere
        </p>
        <h2 className="reveal mt-6 font-heading text-4xl leading-[1.1] text-background sm:text-6xl">
          Le parole giuste non si improvvisano.<br />
          <em className="not-italic text-brand">Si costruiscono.</em>
        </h2>
        <p className="reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
          Ricerca, ascolto, struttura, revisione. Dietro ogni riga che convince ci sono dieci righe
          cancellate. È lì che nasce la differenza tra un testo qualsiasi e un messaggio che vende.
        </p>
        <Link
          to="/contatti"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-brand-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
        >
          Prenota una call gratuita
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
