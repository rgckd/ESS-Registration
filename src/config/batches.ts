// The 5 languages HC Essentials online programs run in — a fixed list
// mirroring heart-comm-db's `languages` table. Which specific program
// instances are open for registration right now is no longer hardcoded
// here: it's queried live from Supabase's `program_instances.registration_open`
// flag via GET /api/instances (see src/lib/instances.ts).

export type LanguageCode = "en" | "ta" | "hi" | "te" | "kn";

export const LANGUAGES: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
];
