# ESS-Registration

Public-facing registration form for Heartfulness Communication (HC)
Essentials **online ES programs**, in any of 5 languages (English, Tamil,
Hindi, Telugu, Kannada). Replaces the per-language Google Form with a single
app that writes straight into the shared "HC Essentials" Supabase project.

## Architecture

- **Next.js (App Router) + TypeScript + Tailwind.** One page
  ([src/app/page.tsx](src/app/page.tsx)) rendering
  [src/components/RegistrationForm.tsx](src/components/RegistrationForm.tsx),
  a client component: pick a language → see that language's current batch →
  fill the form → submit.
- **No browser-side Supabase client.** The form POSTs JSON to
  [src/app/api/register](src/app/api/register/route.ts), a server route that
  uses the Supabase **service_role** key
  ([src/lib/supabase-admin.ts](src/lib/supabase-admin.ts)) to write directly.
  This mirrors the access model already in place in `heart-comm-db` (RLS is
  enabled on every table with no policies yet, so only `service_role`
  in server-side code can read/write) — no new RLS policies were needed.
- **Same Supabase project as `heart-comm-db`** (project "HC Essentials", ref
  `ppxlhmklrzabcgypnbqa`), same schema: `languages`, `people`, `programs`,
  `program_instances`, `registrations` (see that repo's
  `supabase/migrations/` for full DDL — this app introduces no new tables).

## Where each field goes

Mirrors the shape `heart-comm-db`'s import scripts already use, so form
submissions and historically-imported spreadsheet rows land in the same
structure:

| Form field | Destination |
|---|---|
| Email, First Name, WhatsApp/Mobile, Heartfulness ID, Center, Zone, Language | `people` (upserted by normalized email) |
| Initials, Age, Gender, "know English?", WhatsApp-group answer, the 3 consents, Comments | `registrations.answers` (JSONB) |
| Selected language + current batch | `program_instances` (upserted by `code`, e.g. `ES15-TAMIL`) |

Phone numbers are normalized to E.164 with the same best-effort logic as
`heart-comm-db/scripts/import-es15-tamil.mjs`
([src/lib/normalize.ts](src/lib/normalize.ts)); numbers it can't confidently
place are still saved, with the person flagged `needs_review` + a note with
the raw value — same convention as the import scripts, never silently
dropped or guessed at.

Every submission is inserted as its own `registrations` row — duplicates are
allowed on purpose (matches the existing project convention: every form
submission is kept, no `(person_id, program_instance_id)` uniqueness
constraint).

## Opening/closing a language's registration

Edit [src/config/batches.ts](src/config/batches.ts) — one entry per
language, `isOpen: true/false`, plus the batch `code`/`name`/schedule/
deadline shown on the form. No code or schema changes needed to open a new
cohort or close one out; just update this file and redeploy.

Only **Tamil (ES15, Mar–Apr 2026)** has confirmed batch details as of
2026-07-19, taken from the live registration form. The other four languages
are seeded with placeholder `*-TBD` codes and `isOpen: false` — supply real
batch details before opening them, rather than guessing.

## Translations

[src/lib/translations.ts](src/lib/translations.ts) has full form copy in
all 5 languages. Strings that overlap with `CoC-Registration`'s form (email,
name, WhatsApp, center, disclaimer/consent boilerplate) were carried over
verbatim since those are already-live, previously vetted translations for a
sibling Heartfulness registration form. Strings new to this form — age,
gender, initials, Heartfulness ID, zone, the three program-specific
consents, WhatsApp-group question — are best-effort machine/AI translations.
**Get a native speaker to review the Hindi, Telugu, and Kannada copy for
these new fields before relying on it with real registrants.**

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
# (Supabase Dashboard → Project Settings → API, same project as heart-comm-db)
npm run dev
```

No `NEXT_PUBLIC_*` Supabase vars are needed — the browser never talks to
Supabase directly.

## Anti-spam

A hidden honeypot field (`honey`) is included in the form; real users never
fill it in, bots that autofill every input do. The API route silently
no-ops (reports success, writes nothing) when it's non-empty. There's no
reCAPTCHA wired up yet — `CoC-Registration` uses reCAPTCHA v3 and this app
could adopt the same pattern if spam becomes a problem.

## Related repos (same workspace)

- `heart-comm-db` — the shared Supabase schema/backend + historical data
  import scripts. Source of truth for the DB schema.
- `CoC-Registration` — sibling registration form (Google Apps Script +
  static HTML) for the CoC group-study program; design/translation
  precedent for this app.
