"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { Check, CircleAlert, Plus, Trash2 } from "lucide-react";
import {
  emptyApplication,
  stepSchemas,
  validateStep,
  type ApplicationData,
  type FieldErrors,
} from "@/lib/application";
import {
  PRICE_OFFLINE,
  PRICE_ONLINE,
  formatRange,
  formatTenge,
  getProgram,
  getSession,
  programs,
  sessionsFor,
} from "@/data/training";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type T = Dictionary["apply"];
type Props = { lang: string; t: T; initialProgram?: string; initialSession?: string };

const MAX_PARTICIPANTS = 20;

/** Stage 1 only: the real number will come from the database. */
function demoNumber() {
  const n = crypto.getRandomValues(new Uint16Array(1))[0] % 9000;
  return `ОБ-2026-${1000 + n}`;
}
const REQUEST = "request";

const inputBase =
  "w-full rounded-lg border bg-white px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky/30";

/* ---------- small building blocks ---------- */

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {hint && <span className="ml-2 font-normal text-steel">{hint}</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-bad">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function inputProps(id: string, error?: string, extra = "") {
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${inputBase} ${error ? "border-bad" : "border-line focus:border-sky"} ${extra}`,
  };
}

function Choice({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 ${
        checked ? "border-sky bg-sky-soft" : "border-line bg-white hover:border-steel/50"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-4 accent-[var(--color-sky)]"
      />
      <span className="text-sm leading-snug">{children}</span>
    </label>
  );
}

/* ---------- the form ---------- */

export default function ApplicationForm({ lang, t, initialProgram, initialSession }: Props) {
  const [data, setData] = useState<ApplicationData>(() => {
    const d = emptyApplication();
    const s = initialSession ? getSession(initialSession) : undefined;
    if (s) {
      d.programId = s.programId;
      d.sessionId = s.id;
    } else if (initialProgram && getProgram(initialProgram)) {
      d.programId = initialProgram;
      d.sessionId = sessionsFor(initialProgram).length ? "" : REQUEST;
    }
    return d;
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const setParticipant = (i: number, key: "name" | "position" | "email", value: string) => {
    setData((d) => ({
      ...d,
      participants: d.participants.map((p, j) => (j === i ? { ...p, [key]: value } : p)),
    }));
    setErrors((e) => {
      const k = `participants.${i}.${key}`;
      if (!e[k]) return e;
      const next = { ...e };
      delete next[k];
      return next;
    });
  };

  const err = (key: string) => (errors[key] ? t.errors[errors[key] as keyof T["errors"]] ?? t.errors.required : undefined);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    const id = first.replace(/\./g, "-");
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id)}, [name="${first}"]`);
      el?.focus();
      el?.scrollIntoView({ block: "center" });
    });
  };

  const goNext = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  };

  const goTo = (target: number) => {
    // Allow jumping back freely; forward only through valid steps.
    for (let s = 0; s < target; s++) {
      const errs = validateStep(s, data);
      if (Object.keys(errs).length) {
        setStep(s);
        setErrors(errs);
        return focusFirstError(errs);
      }
    }
    setErrors({});
    setStep(target);
    window.scrollTo({ top: 0 });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < stepSchemas.length - 1) return goNext();
    for (let s = 0; s < stepSchemas.length; s++) {
      const errs = validateStep(s, data);
      if (Object.keys(errs).length) {
        setStep(s);
        setErrors(errs);
        return focusFirstError(errs);
      }
    }
    // Stage 1: no backend yet — generate a demo number.
    setDone(demoNumber());
    window.scrollTo({ top: 0 });
  };

  const program = getProgram(data.programId);
  const session = data.sessionId && data.sessionId !== REQUEST ? getSession(data.sessionId) : undefined;
  const programSessions = data.programId ? sessionsFor(data.programId) : [];
  const price = data.format === "online" ? PRICE_ONLINE : PRICE_OFFLINE;
  const total = price * data.participants.length;

  /* ---------- success ---------- */
  if (done) {
    return (
      <div className="rounded-lg border border-line bg-white p-6 md:p-10" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-ok-soft text-ok">
          <Check className="size-6" aria-hidden />
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">{t.success.title}</h2>
        <p className="mt-4 text-sm text-steel">{t.success.number}</p>
        <p className="tabular text-3xl font-semibold tracking-tight">{done}</p>
        <p className="mt-4 max-w-prose">{t.success.text.replace("{email}", data.email)}</p>
        <p className="mt-2 text-sm text-warn">{t.success.demoText}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/obuchenie`}
            className="inline-flex min-h-11 items-center rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-ink/90"
          >
            {t.success.back}
          </Link>
          <button
            type="button"
            onClick={() => {
              setData(emptyApplication());
              setStep(0);
              setDone(null);
            }}
            className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-5 text-sm font-medium hover:border-ink"
          >
            {t.success.again}
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={submit} noValidate>
      {/* Stepper */}
      <nav aria-label={t.title}>
        <p className="text-sm text-steel md:hidden">
          {t.step} {step + 1} {t.of} {t.steps.length}:{" "}
          <span className="font-medium text-ink">{t.steps[step]}</span>
        </p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-line md:hidden">
          <div
            className="h-full bg-sky transition-[width]"
            style={{ width: `${((step + 1) / t.steps.length) * 100}%` }}
          />
        </div>
        <ol className="hidden gap-2 md:flex">
          {t.steps.map((label, i) => (
            <li key={label} className="flex-1">
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
                className={`w-full border-t-2 pt-2 text-left text-sm ${
                  i === step
                    ? "border-sky font-semibold text-ink"
                    : i < step
                      ? "border-ink text-ink hover:text-sky"
                      : "border-line text-steel"
                }`}
              >
                <span className="tabular mr-1.5 text-steel">{i + 1}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {hasErrors && (
        <p className="mt-6 flex items-center gap-2 rounded-lg bg-bad-soft px-4 py-3 text-sm text-bad" role="alert">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {t.errors.fix}
        </p>
      )}

      <div className="mt-6 rounded-lg border border-line bg-white p-5 md:p-8">
        {/* Step 1: course */}
        {step === 0 && (
          <fieldset className="space-y-6">
            <legend className="sr-only">{t.steps[0]}</legend>
            <Field id="programId" label={t.course.program} error={err("programId")}>
              <select
                {...inputProps("programId", err("programId"))}
                value={data.programId}
                onChange={(e) => {
                  const id = e.target.value;
                  set("programId", id);
                  set("sessionId", id && sessionsFor(id).length === 0 ? REQUEST : "");
                }}
              >
                <option value="">—</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.standard} — {p.title}
                  </option>
                ))}
              </select>
            </Field>

            {data.programId && (
              <fieldset>
                <legend className="text-sm font-medium">{t.course.session}</legend>
                <div id="sessionId" tabIndex={-1} className="mt-1.5 grid gap-2 sm:grid-cols-2">
                  {programSessions.map((s) => (
                    <Choice
                      key={s.id}
                      name="sessionId"
                      value={s.id}
                      checked={data.sessionId === s.id}
                      onChange={(v) => set("sessionId", v)}
                    >
                      <span className="tabular font-medium">{formatRange(s.start, s.end, lang)}</span>
                    </Choice>
                  ))}
                  <Choice
                    name="sessionId"
                    value={REQUEST}
                    checked={data.sessionId === REQUEST}
                    onChange={(v) => set("sessionId", v)}
                  >
                    {t.course.onRequest}
                  </Choice>
                </div>
                {err("sessionId") && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-bad">
                    <CircleAlert className="size-4" aria-hidden />
                    {err("sessionId")}
                  </p>
                )}
              </fieldset>
            )}

            <fieldset>
              <legend className="text-sm font-medium">{t.course.format}</legend>
              <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                <Choice name="format" value="online" checked={data.format === "online"} onChange={() => set("format", "online")}>
                  <span className="font-medium">{t.course.online}</span>
                  <span className="tabular block text-steel">{formatTenge(PRICE_ONLINE)}</span>
                </Choice>
                <Choice name="format" value="offline" checked={data.format === "offline"} onChange={() => set("format", "offline")}>
                  <span className="font-medium">{t.course.offline}</span>
                  <span className="tabular block text-steel">{formatTenge(PRICE_OFFLINE)}</span>
                </Choice>
              </div>
            </fieldset>

            {data.format === "offline" && (
              <fieldset>
                <legend className="text-sm font-medium">{t.course.city}</legend>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <Choice name="city" value="astana" checked={data.city === "astana"} onChange={() => set("city", "astana")}>
                    {t.course.astana}
                  </Choice>
                  <Choice name="city" value="almaty" checked={data.city === "almaty"} onChange={() => set("city", "almaty")}>
                    {t.course.almaty}
                  </Choice>
                </div>
              </fieldset>
            )}
          </fieldset>
        )}

        {/* Step 2: organization */}
        {step === 1 && (
          <fieldset className="space-y-5">
            <legend className="sr-only">{t.steps[1]}</legend>
            <Field id="orgName" label={t.org.name} error={err("orgName")}>
              <input {...inputProps("orgName", err("orgName"))} value={data.orgName} onChange={(e) => set("orgName", e.target.value)} autoComplete="organization" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
              <Field id="bin" label={t.org.bin} hint={t.org.binHint} error={err("bin")}>
                <input {...inputProps("bin", err("bin"), "tabular")} value={data.bin} onChange={(e) => set("bin", e.target.value)} inputMode="numeric" maxLength={14} />
              </Field>
              <Field id="postcode" label={t.org.postcode} error={err("postcode")}>
                <input {...inputProps("postcode", err("postcode"))} value={data.postcode} onChange={(e) => set("postcode", e.target.value)} inputMode="numeric" maxLength={6} autoComplete="postal-code" />
              </Field>
            </div>
            <Field id="legalAddress" label={t.org.legalAddress} error={err("legalAddress")}>
              <input {...inputProps("legalAddress", err("legalAddress"))} value={data.legalAddress} onChange={(e) => set("legalAddress", e.target.value)} autoComplete="street-address" />
            </Field>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={data.actualSame} onChange={(e) => set("actualSame", e.target.checked)} className="mt-0.5 size-4 accent-[var(--color-sky)]" />
              {t.org.actualSame}
            </label>
            {!data.actualSame && (
              <Field id="actualAddress" label={t.org.actualAddress} error={err("actualAddress")}>
                <input {...inputProps("actualAddress", err("actualAddress"))} value={data.actualAddress} onChange={(e) => set("actualAddress", e.target.value)} />
              </Field>
            )}
            <fieldset>
              <legend className="text-sm font-medium">{t.org.procurement}</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2 sm:max-w-sm">
                <Choice name="procurement" value="yes" checked={data.procurement === "yes"} onChange={() => set("procurement", "yes")}>{t.org.yes}</Choice>
                <Choice name="procurement" value="no" checked={data.procurement === "no"} onChange={() => set("procurement", "no")}>{t.org.no}</Choice>
              </div>
            </fieldset>
          </fieldset>
        )}

        {/* Step 3: participants */}
        {step === 2 && (
          <fieldset>
            <legend className="text-lg font-semibold">{t.people.title}</legend>
            <ol className="mt-4 space-y-4">
              {data.participants.map((p, i) => (
                <li key={i} className="rounded-lg border border-line p-4">
                  <div className="flex items-center justify-between">
                    <p className="tabular text-sm font-medium text-steel">
                      {t.people.person} {i + 1}
                    </p>
                    {data.participants.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setData((d) => ({ ...d, participants: d.participants.filter((_, j) => j !== i) }))
                        }
                        className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-steel hover:text-bad"
                      >
                        <Trash2 className="size-4" aria-hidden />
                        {t.people.remove}
                      </button>
                    )}
                  </div>
                  <div className="mt-2 grid gap-4 md:grid-cols-3">
                    <Field id={`participants-${i}-name`} label={t.people.name} error={err(`participants.${i}.name`)}>
                      <input {...inputProps(`participants-${i}-name`, err(`participants.${i}.name`))} value={p.name} onChange={(e) => setParticipant(i, "name", e.target.value)} autoComplete="off" />
                    </Field>
                    <Field id={`participants-${i}-position`} label={t.people.position} error={err(`participants.${i}.position`)}>
                      <input {...inputProps(`participants-${i}-position`, err(`participants.${i}.position`))} value={p.position} onChange={(e) => setParticipant(i, "position", e.target.value)} autoComplete="off" />
                    </Field>
                    <Field id={`participants-${i}-email`} label={t.people.email} hint={t.people.emailHint} error={err(`participants.${i}.email`)}>
                      <input {...inputProps(`participants-${i}-email`, err(`participants.${i}.email`))} type="email" value={p.email} onChange={(e) => setParticipant(i, "email", e.target.value)} autoComplete="off" />
                    </Field>
                  </div>
                </li>
              ))}
            </ol>
            {data.participants.length < MAX_PARTICIPANTS && (
              <button
                type="button"
                onClick={() =>
                  setData((d) => ({ ...d, participants: [...d.participants, { name: "", position: "", email: "" }] }))
                }
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-dashed border-steel/50 px-4 text-sm font-medium hover:border-sky hover:text-sky"
              >
                <Plus className="size-4" aria-hidden />
                {t.people.add}
              </button>
            )}
            <p className="mt-5 text-sm text-steel">{t.people.idNote}</p>
          </fieldset>
        )}

        {/* Step 4: bank details & contacts */}
        {step === 3 && (
          <fieldset className="space-y-5">
            <legend className="text-lg font-semibold">{t.bank.title}</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="iik" label={t.bank.iik} hint={t.bank.iikHint} error={err("iik")}>
                <input {...inputProps("iik", err("iik"), "tabular uppercase")} value={data.iik} onChange={(e) => set("iik", e.target.value.toUpperCase())} maxLength={24} />
              </Field>
              <Field id="bik" label={t.bank.bik} hint={t.bank.bikHint} error={err("bik")}>
                <input {...inputProps("bik", err("bik"), "tabular uppercase")} value={data.bik} onChange={(e) => set("bik", e.target.value.toUpperCase())} maxLength={8} />
              </Field>
            </div>
            <Field id="bank" label={t.bank.bank} error={err("bank")}>
              <input {...inputProps("bank", err("bank"))} value={data.bank} onChange={(e) => set("bank", e.target.value)} />
            </Field>
            <Field id="head" label={t.bank.head} error={err("head")}>
              <input {...inputProps("head", err("head"))} value={data.head} onChange={(e) => set("head", e.target.value)} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field id="contact" label={t.bank.contact} error={err("contact")}>
                <input {...inputProps("contact", err("contact"))} value={data.contact} onChange={(e) => set("contact", e.target.value)} autoComplete="name" />
              </Field>
              <Field id="phone" label={t.bank.phone} error={err("phone")}>
                <input {...inputProps("phone", err("phone"))} type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+7 777 123 45 67" autoComplete="tel" />
              </Field>
              <Field id="email" label={t.bank.email} error={err("email")}>
                <input {...inputProps("email", err("email"))} type="email" value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              </Field>
            </div>
          </fieldset>
        )}

        {/* Step 5: review */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold">{t.review.title}</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {[
                {
                  step: 0,
                  label: t.steps[0],
                  value: (
                    <>
                      <span className="font-medium">{program?.standard}</span> — {program?.title}
                      <br />
                      {session ? formatRange(session.start, session.end, lang) : t.course.onRequest},{" "}
                      {data.format === "online" ? t.course.online : `${t.course.offline}, ${data.city === "astana" ? t.course.astana : t.course.almaty}`}
                    </>
                  ),
                },
                {
                  step: 1,
                  label: t.steps[1],
                  value: (
                    <>
                      {data.orgName}, {t.org.bin} <span className="tabular">{data.bin}</span>
                      <br />
                      {data.postcode}, {data.legalAddress}
                      {!data.actualSame && <><br />{data.actualAddress}</>}
                      <br />
                      {t.org.procurement}: {data.procurement === "yes" ? t.org.yes : t.org.no}
                    </>
                  ),
                },
                {
                  step: 2,
                  label: t.steps[2],
                  value: (
                    <ol className="list-decimal pl-5">
                      {data.participants.map((p, i) => (
                        <li key={i}>
                          {p.name}, {p.position}
                        </li>
                      ))}
                    </ol>
                  ),
                },
                {
                  step: 3,
                  label: t.steps[3],
                  value: (
                    <>
                      {t.bank.iik} <span className="tabular">{data.iik}</span>, {t.bank.bik} {data.bik}, {data.bank}
                      <br />
                      {t.bank.head}: {data.head}
                      <br />
                      {data.contact}, <span className="tabular">{data.phone}</span>, {data.email}
                    </>
                  ),
                },
              ].map((row) => (
                <div key={row.step} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:gap-4">
                  <dt className="text-sm text-steel">{row.label}</dt>
                  <dd className="text-sm leading-relaxed [overflow-wrap:anywhere]">{row.value}</dd>
                  <dd>
                    <button type="button" onClick={() => goTo(row.step)} className="text-sm font-medium text-sky hover:underline">
                      {t.review.edit}
                    </button>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 rounded-lg bg-paper p-4">
              <span className="text-sm text-steel">
                {t.review.total}{" "}
                <span className="tabular">
                  ({data.participants.length} × {formatTenge(price)})
                </span>
              </span>
              <span className="tabular text-2xl font-semibold">{formatTenge(total)}</span>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm">
              <input
                id="consent"
                type="checkbox"
                checked={data.consent}
                onChange={(e) => set("consent", e.target.checked)}
                aria-invalid={err("consent") ? true : undefined}
                className="mt-0.5 size-4 shrink-0 accent-[var(--color-sky)]"
              />
              {t.review.consent}
            </label>
            {err("consent") && (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-bad">
                <CircleAlert className="size-4" aria-hidden />
                {t.review.consentRequired}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-white px-6 font-medium hover:border-ink"
          >
            {t.back}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-8 font-semibold text-white hover:bg-ink/90"
        >
          {step === stepSchemas.length - 1 ? t.submit : t.next}
        </button>
      </div>
    </form>
  );
}
