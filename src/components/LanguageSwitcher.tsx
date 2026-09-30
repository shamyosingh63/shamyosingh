import { LANGS, useLang } from "@/lib/i18n";

const LABELS = { it: { short: "IT", name: "Italiano" }, en: { short: "EN", name: "English" } } as const;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Lingua / Language" className={`flex items-center gap-1 text-xs font-semibold tracking-[0.15em] ${className}`}>
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 ? <span aria-hidden className="text-border">|</span> : null}
          <button
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            aria-label={LABELS[code].name}
            className={`rounded px-1 py-0.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${
              lang === code ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {LABELS[code].short}
          </button>
        </span>
      ))}
    </div>
  );
}
