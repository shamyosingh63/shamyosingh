import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/** Lingue supportate. Per aggiungerne una: estendi LANGS e i dizionari `{ it, en, ... }`. */
export const LANGS = ["it", "en"] as const;
export type Lang = (typeof LANGS)[number];

const STORAGE_KEY = "shamyo-lang";

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "it", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) setLangState(saved as Lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Restituisce il dizionario della lingua attiva. */
export function useCopy<T>(dict: Record<Lang, T>): T {
  const { lang } = useLang();
  return dict[lang];
}
