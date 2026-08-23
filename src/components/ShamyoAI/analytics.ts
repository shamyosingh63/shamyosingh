type AnalyticsEvent =
  | "chatbot_open"
  | "chatbot_message"
  | "chatbot_service_click"
  | "chatbot_lead_started"
  | "chatbot_lead_submitted"
  | "chatbot_contact_click";

type Gtag = (...args: unknown[]) => void;

/**
 * Invia un evento all'analytics già presente sul sito (gtag / dataLayer / Vercel
 * Analytics). Se nessun sistema è presente non fa nulla. Nessun dato personale.
 */
export function trackChatEvent(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: Gtag;
    dataLayer?: unknown[];
    va?: (name: string, event: string, props?: Record<string, string>) => void;
  };
  try {
    if (typeof w.gtag === "function") w.gtag("event", event, params);
    else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params });
    if (typeof w.va === "function") w.va("event", event, params);
  } catch {
    // analytics non deve mai rompere la chat
  }
}
