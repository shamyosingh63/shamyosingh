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

export type LeadResult = { ok: true } | { ok: false; error: string };

/** Invia una richiesta a /api/lead e restituisce l'errore reale del server. */
export async function submitLeadDetailed(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string; detail?: string; status?: number };
    const parts = [data.message ?? data.error ?? `HTTP ${res.status}`];
    if (data.detail) parts.push(data.detail);
    return { ok: false, error: parts.join(" — ") };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network_error" };
  }
}

/** Invia una richiesta a /api/lead. Ritorna true se il server l'ha accettata. */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  return (await submitLeadDetailed(payload)).ok;
}
