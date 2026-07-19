import type { LanguageCode } from "@/config/batches";

// A program_instances row currently open for registration (registration_open
// = true), shaped for the frontend. `schedule` / `registrationDeadline` are
// informational copy pulled from the instance's `metadata` JSONB — not
// every instance will have them set.
export interface OpenInstance {
  id: string;
  code: string;
  name: string;
  languageCode: LanguageCode | null;
  sessionCount: number | null;
  schedule: string | null;
  registrationDeadline: string | null;
}
