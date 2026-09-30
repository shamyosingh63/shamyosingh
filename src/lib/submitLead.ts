export type LeadPayload = {
  kind: "quote" | "copy_check" | "chat";
  name: string;
  email: string;
  website?: string;
  company?: string;
  service?: string;
  package?: string;
  description?: string;
  goal?: string;
  language?: string;
  preferredDate?: string;
  preferredTime?: string;
};

/** Invia una richiesta a /api/lead. Ritorna true se il server l'ha accettata. */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
