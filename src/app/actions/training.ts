"use server";

import { createClient } from "@supabase/supabase-js";
import {
  stepSchemas,
  validateStep,
  type ApplicationData,
  type FieldErrors,
} from "@/lib/application";
import { getProgram, getSession } from "@/data/training";

export type SubmitResult =
  | { ok: true; number: string; demo: boolean }
  | { ok: false; error: "validation"; fields: FieldErrors; step: number }
  | { ok: false; error: "server" };

const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Public endpoint: anyone can call it with a POST, so every input is
 * untrusted. We re-validate with the same Zod schema as the form,
 * normalize values, and let the database compute the price and number.
 */
export async function submitTrainingApplication(
  input: ApplicationData & { website?: string },
): Promise<SubmitResult> {
  // Honeypot: real users never see or fill the "website" field.
  if (input.website) return { ok: true, number: "ОБ-0000-0000", demo: true };

  for (let step = 0; step < stepSchemas.length; step++) {
    const fields = validateStep(step, input);
    if (Object.keys(fields).length) return { ok: false, error: "validation", fields, step };
  }

  // Program and session must exist in our catalogue.
  const sessionOk = input.sessionId === "request" || getSession(input.sessionId)?.programId === input.programId;
  if (!getProgram(input.programId) || !sessionOk) {
    return { ok: false, error: "validation", fields: { sessionId: "session" }, step: 0 };
  }

  const payload = {
    programId: input.programId,
    sessionId: input.sessionId,
    format: input.format,
    city: input.city,
    orgName: input.orgName.trim(),
    bin: digits(input.bin),
    legalAddress: input.legalAddress.trim(),
    postcode: input.postcode.trim(),
    actualAddress: input.actualSame ? "" : input.actualAddress.trim(),
    procurement: input.procurement,
    iik: input.iik.replace(/\s/g, "").toUpperCase(),
    bank: input.bank.trim(),
    bik: input.bik.trim().toUpperCase(),
    head: input.head.trim(),
    contact: input.contact.trim(),
    phone: digits(input.phone),
    email: input.email.trim().toLowerCase(),
    consent: input.consent === true,
    participants: input.participants.slice(0, 20).map((p) => ({
      name: p.name.trim(),
      position: p.position.trim(),
      email: p.email.trim().toLowerCase(),
    })),
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // No database configured (e.g. a fresh clone): keep the demo working.
  if (!url || !key) {
    const n = 1000 + (crypto.getRandomValues(new Uint16Array(1))[0] % 9000);
    return { ok: true, number: `ОБ-2026-${n}`, demo: true };
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc("submit_training_application", { payload });

  if (error || typeof data !== "string") {
    console.error("submit_training_application failed:", error?.message);
    return { ok: false, error: "server" };
  }
  return { ok: true, number: data, demo: false };
}
