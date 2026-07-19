"use client";

import { useEffect, useState } from "react";
import { LANGUAGES, LanguageCode } from "@/config/batches";
import { translations } from "@/lib/translations";
import type { OpenInstance } from "@/lib/instances";

const initialFormState = {
  email: "",
  firstName: "",
  initials: "",
  age: "",
  gender: "",
  phone: "",
  heartfulnessId: "",
  center: "",
  zone: "",
  knowsEnglish: "",
  whatsappGroup: "",
  sessionConsent: false,
  videoConsent: false,
  contactConsent: false,
  disclaimerConsent: false,
  comments: "",
  honey: "",
};

type FormState = typeof initialFormState;

export default function RegistrationForm() {
  const [languageCode, setLanguageCode] = useState<LanguageCode | "">("");
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [instances, setInstances] = useState<OpenInstance[] | null>(null);
  const [instancesFailed, setInstancesFailed] = useState(false);
  const [selectedInstanceCode, setSelectedInstanceCode] = useState("");

  useEffect(() => {
    fetch("/api/instances")
      .then((res) => res.json())
      .then((data) => setInstances(data.instances ?? []))
      .catch(() => setInstancesFailed(true));
  }, []);

  const t = translations[(languageCode || "en") as LanguageCode];
  const matchingInstances = (instances ?? []).filter((i) => i.languageCode === languageCode);
  const selectedInstance =
    matchingInstances.length === 1
      ? matchingInstances[0]
      : matchingInstances.find((i) => i.code === selectedInstanceCode) ?? null;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onLanguageChange(code: LanguageCode) {
    setLanguageCode(code);
    setSelectedInstanceCode("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedInstance) return;

    const missing: string[] = [];
    if (!form.email.trim()) missing.push(t.email);
    if (!form.firstName.trim()) missing.push(t.firstName);
    if (!form.phone.trim()) missing.push(t.whatsapp);
    if (!form.center.trim()) missing.push(t.center);
    if (languageCode !== "en" && !form.knowsEnglish) missing.push(t.english);
    if (!form.sessionConsent) missing.push(t.sessionConsent);
    if (!form.videoConsent) missing.push(t.videoConsent);
    if (!form.contactConsent) missing.push(t.contactConsent);
    if (!form.disclaimerConsent) missing.push(t.disclaimerShort);
    if (missing.length) {
      setError(`${t.errorRequired} ${missing.join(", ")}`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instanceCode: selectedInstance.code, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed.");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError(t.networkError);
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto mt-16 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-green-800">{t.successTitle}</h2>
        <p className="mt-2 text-green-700">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">HC Essentials — Program Registration</h1>

      <label className="block font-semibold mb-1">
        Program Language / மொழி / भाषा / భాష / ಭಾಷೆ *
      </label>
      <select
        className="w-full rounded border border-slate-300 p-2 mb-1"
        value={languageCode}
        onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
        required
      >
        <option value="">Select</option>
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeLabel}
          </option>
        ))}
      </select>
      {languageCode && (
        <p className="text-sm text-slate-500 mb-6">{t.languageHelper}</p>
      )}

      {languageCode && instances === null && !instancesFailed && (
        <p className="text-slate-500 text-center">{t.loadingPrograms}</p>
      )}

      {languageCode && (instancesFailed || (instances !== null && matchingInstances.length === 0)) && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
          <h2 className="font-semibold text-amber-800">{t.notOpenTitle}</h2>
          <p className="mt-2 text-amber-700">{t.notOpenMessage}</p>
        </div>
      )}

      {languageCode && matchingInstances.length > 1 && (
        <div className="mb-6">
          <label className="block font-semibold mb-1">{t.chooseBatch}</label>
          <select
            className="w-full rounded border border-slate-300 p-2"
            value={selectedInstanceCode}
            onChange={(e) => setSelectedInstanceCode(e.target.value)}
            required
          >
            <option value="">{t.select}</option>
            {matchingInstances.map((inst) => (
              <option key={inst.code} value={inst.code}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedInstance && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {(selectedInstance.schedule || selectedInstance.registrationDeadline) && (
            <div className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-600">
              {selectedInstance.schedule && (
                <p>
                  <span className="font-semibold">{t.scheduleLabel}: </span>
                  {selectedInstance.schedule}
                </p>
              )}
              {selectedInstance.registrationDeadline && (
                <p>
                  <span className="font-semibold">{t.deadlineLabel}: </span>
                  {selectedInstance.registrationDeadline}
                </p>
              )}
            </div>
          )}

          {/* Honeypot — hidden from real users via CSS, left empty by them */}
          <input
            type="text"
            name="honey"
            value={form.honey}
            onChange={(e) => update("honey", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <Field label={t.email}>
            <input
              type="email"
              required
              className="w-full rounded border border-slate-300 p-2"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">{t.emailHelper}</p>
          </Field>

          <Field label={t.firstName}>
            <input
              type="text"
              required
              className="w-full rounded border border-slate-300 p-2"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </Field>

          <Field label={`${t.initials} (${t.optional})`}>
            <input
              type="text"
              className="w-full rounded border border-slate-300 p-2"
              value={form.initials}
              onChange={(e) => update("initials", e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">{t.initialsHelper}</p>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label={`${t.age} (${t.optional})`}>
              <input
                type="number"
                min={1}
                max={120}
                className="w-full rounded border border-slate-300 p-2"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
              />
            </Field>
            <Field label={`${t.gender} (${t.optional})`}>
              <select
                className="w-full rounded border border-slate-300 p-2"
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="">{t.genderSelect}</option>
                <option value="female">{t.genderFemale}</option>
                <option value="male">{t.genderMale}</option>
                <option value="other">{t.genderOther}</option>
                <option value="prefer_not">{t.genderPreferNot}</option>
              </select>
            </Field>
          </div>

          <Field label={t.whatsapp}>
            <input
              type="tel"
              required
              placeholder="+91XXXXXXXXXX"
              className="w-full rounded border border-slate-300 p-2"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">{t.whatsappHelper}</p>
          </Field>

          <Field label={`${t.heartfulnessId} (${t.optional})`}>
            <input
              type="text"
              className="w-full rounded border border-slate-300 p-2"
              value={form.heartfulnessId}
              onChange={(e) => update("heartfulnessId", e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">{t.heartfulnessIdHelper}</p>
          </Field>

          <Field label={t.center}>
            <input
              type="text"
              required
              className="w-full rounded border border-slate-300 p-2"
              value={form.center}
              onChange={(e) => update("center", e.target.value)}
            />
          </Field>

          <Field label={`${t.zone} (${t.optional})`}>
            <input
              type="text"
              className="w-full rounded border border-slate-300 p-2"
              value={form.zone}
              onChange={(e) => update("zone", e.target.value)}
            />
          </Field>

          {languageCode !== "en" && (
            <Field label={t.english}>
              <select
                required
                className="w-full rounded border border-slate-300 p-2"
                value={form.knowsEnglish}
                onChange={(e) => update("knowsEnglish", e.target.value)}
              >
                <option value="">{t.select}</option>
                <option value="yes">{t.yes}</option>
                <option value="no">{t.no}</option>
              </select>
            </Field>
          )}

          <Field label={t.whatsappGroup}>
            <select
              className="w-full rounded border border-slate-300 p-2"
              value={form.whatsappGroup}
              onChange={(e) => update("whatsappGroup", e.target.value)}
            >
              <option value="">{t.select}</option>
              <option value="yes">{t.yes}</option>
              <option value="no">{t.no}</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">{t.whatsappGroupHelper}</p>
          </Field>

          <Checkbox
            checked={form.sessionConsent}
            onChange={(v) => update("sessionConsent", v)}
            label={t.sessionConsent}
          />
          <Checkbox
            checked={form.videoConsent}
            onChange={(v) => update("videoConsent", v)}
            label={t.videoConsent}
          />
          <Checkbox
            checked={form.contactConsent}
            onChange={(v) => update("contactConsent", v)}
            label={t.contactConsent}
          />

          <Field label={`${t.commentsLabel}`}>
            <textarea
              rows={3}
              className="w-full rounded border border-slate-300 p-2"
              value={form.comments}
              onChange={(e) => update("comments", e.target.value)}
            />
            <p className="text-xs text-slate-500 mt-1">{t.commentsHelper}</p>
          </Field>

          <div className="rounded border border-slate-200 bg-slate-100 p-4">
            <Checkbox
              checked={form.disclaimerConsent}
              onChange={(v) => update("disclaimerConsent", v)}
              label={renderDisclaimer(t.disclaimerConsent)}
            />
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-slate-900 text-white py-3 font-semibold disabled:opacity-50"
          >
            {submitting ? t.submittingText : t.submitButton}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      {children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        className="mt-1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function renderDisclaimer(text: string) {
  const parts = text
    .replace(/\[LINK\](.*?)\[\/LINK\]/, "|||LINK|||$1|||/LINK|||")
    .replace(/\[TERMS\](.*?)\[\/TERMS\]/, "|||TERMS|||$1|||/TERMS|||")
    .split("|||");

  return parts.map((part, i) => {
    if (part === "LINK" || part === "/LINK" || part === "TERMS" || part === "/TERMS") return null;
    const prevMarker = parts[i - 1];
    if (prevMarker === "LINK") {
      return (
        <a key={i} href="https://www.hcessentials.org/disclaimer" target="_blank" rel="noreferrer" className="underline">
          {part}
        </a>
      );
    }
    if (prevMarker === "TERMS") {
      return (
        <a key={i} href="https://heartfulness.org/us/terms/" target="_blank" rel="noreferrer" className="underline">
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
