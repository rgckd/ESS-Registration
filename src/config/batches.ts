// The single place to open/close registration for a language's current ES
// batch, or update its schedule details, without touching form/API code.
// Update this file each time a new cohort starts for a language.
//
// `code` becomes `program_instances.code` in Supabase (upserted on first
// registration for that batch) — keep it unique per batch, following the
// existing convention seen in heart-comm-db (e.g. "ES15-TAMIL").

export type LanguageCode = "en" | "ta" | "hi" | "te" | "kn";

export interface BatchConfig {
  languageCode: LanguageCode;
  isOpen: boolean;
  code: string;
  name: string;
  sessionCount: number | null;
  schedule: string | null;
  registrationDeadline: string | null; // ISO date, informational only
}

export const LANGUAGES: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
];

// Only ES15 Tamil's details are confirmed (from the live registration form
// as of 2026-07-19). The other four languages are left closed with
// placeholder codes until their real batch details are supplied — do not
// guess at dates/schedules for them.
export const BATCHES: Record<LanguageCode, BatchConfig> = {
  ta: {
    languageCode: "ta",
    isOpen: true,
    code: "ES15-TAMIL",
    name: "HC Essentials ES15 (Tamil)",
    sessionCount: 8,
    schedule:
      "Eight 2-hour sessions, weekends (Sat–Sun), 6:30–8:30 PM, via Zoom",
    registrationDeadline: "2026-03-08",
  },
  en: {
    languageCode: "en",
    isOpen: false,
    code: "ES-ENGLISH-TBD",
    name: "HC Essentials (English)",
    sessionCount: null,
    schedule: null,
    registrationDeadline: null,
  },
  hi: {
    languageCode: "hi",
    isOpen: false,
    code: "ES-HINDI-TBD",
    name: "HC Essentials (Hindi)",
    sessionCount: null,
    schedule: null,
    registrationDeadline: null,
  },
  te: {
    languageCode: "te",
    isOpen: false,
    code: "ES-TELUGU-TBD",
    name: "HC Essentials (Telugu)",
    sessionCount: null,
    schedule: null,
    registrationDeadline: null,
  },
  kn: {
    languageCode: "kn",
    isOpen: false,
    code: "ES-KANNADA-TBD",
    name: "HC Essentials (Kannada)",
    sessionCount: null,
    schedule: null,
    registrationDeadline: null,
  },
};
