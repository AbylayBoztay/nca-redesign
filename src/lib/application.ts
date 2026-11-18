import { z } from "zod";

// Error messages are dictionary keys (apply.errors.*), resolved in the UI.
// The same schema will validate the request on the server in stage 2.

const req = z.string().trim().min(1, "required");
const digits = (s: string) => s.replace(/\D/g, "");

export const participantSchema = z.object({
  name: req,
  position: req,
  email: z
    .string()
    .trim()
    .refine((v) => v === "" || z.email().safeParse(v).success, "email"),
});

export const courseStep = z
  .object({
    programId: req,
    sessionId: z.string(),
    format: z.enum(["online", "offline"]),
    city: z.enum(["astana", "almaty"]),
  })
  .refine((v) => v.sessionId !== "", { path: ["sessionId"], message: "session" });

export const orgStep = z
  .object({
    orgName: req,
    bin: z.string().refine((v) => /^\d{12}$/.test(digits(v)), "bin"),
    legalAddress: req,
    postcode: z.string().refine((v) => /^\d{6}$/.test(v.trim()), "postcode"),
    actualSame: z.boolean(),
    actualAddress: z.string(),
    procurement: z.enum(["yes", "no"]),
  })
  .refine((v) => v.actualSame || v.actualAddress.trim() !== "", {
    path: ["actualAddress"],
    message: "required",
  });

export const peopleStep = z.object({
  participants: z.array(participantSchema).min(1),
});

const normalizeIik = (v: string) => v.replace(/\s/g, "").toUpperCase();

export const bankStep = z.object({
  iik: z.string().refine((v) => /^KZ[0-9A-Z]{18}$/.test(normalizeIik(v)), "iik"),
  bank: req,
  bik: z.string().refine((v) => /^[A-Z0-9]{8}$/.test(v.trim().toUpperCase()), "bik"),
  head: req,
  contact: req,
  phone: z.string().refine((v) => /^[78]\d{10}$/.test(digits(v)), "phone"),
  email: z.email("email"),
});

export const reviewStep = z.object({
  consent: z.literal(true, "consentRequired"),
});

export const stepSchemas = [courseStep, orgStep, peopleStep, bankStep, reviewStep];

export type Participant = z.infer<typeof participantSchema>;

export type ApplicationData = z.infer<typeof courseStep> &
  z.infer<typeof orgStep> &
  z.infer<typeof peopleStep> &
  z.infer<typeof bankStep> & { consent: boolean };

export type FieldErrors = Record<string, string>;

/** Validate one step; returns { "participants.0.name": "required", ... } */
export function validateStep(step: number, data: ApplicationData): FieldErrors {
  const res = stepSchemas[step].safeParse(data);
  if (res.success) return {};
  const errors: FieldErrors = {};
  for (const issue of res.error.issues) {
    const key = issue.path.join(".");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export const emptyApplication = (): ApplicationData => ({
  programId: "",
  sessionId: "",
  format: "online",
  city: "astana",
  orgName: "",
  bin: "",
  legalAddress: "",
  postcode: "",
  actualSame: true,
  actualAddress: "",
  procurement: "no",
  participants: [{ name: "", position: "", email: "" }],
  iik: "",
  bank: "",
  bik: "",
  head: "",
  contact: "",
  phone: "",
  email: "",
  consent: false,
});
