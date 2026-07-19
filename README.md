# ESS-Registration

Public-facing registration form for Heartfulness Communication (HC)
Essentials **online ES programs**, in any of 5 languages (English, Tamil,
Hindi, Telugu, Kannada). Replaces the per-language Google Form with a single
app that writes straight into the shared "HC Essentials" Supabase project.

## Architecture

- **Next.js (App Router) + TypeScript + Tailwind.** One page
  ([src/app/page.tsx](src/app/page.tsx)) rendering
  [src/components/RegistrationForm.tsx](src/components/RegistrationForm.tsx),
  a client component: pick a language → the app looks up which
  `program_instances` are currently open for that language → fill the form →
  submit.
- **No browser-side Supabase client.** Both reads and writes go through
  server routes using the Supabase **service_role** key
  ([src/lib/supabase-admin.ts](src/lib/supabase-admin.ts)):
  [src/app/api/instances](src/app/api/instances/route.ts) (GET, lists open
  instances) and [src/app/api/register](src/app/api/register/route.ts)
  (POST, writes a registration). This mirrors the access model already in
  place in `heart-comm-db` (RLS is enabled on every table with no policies
  yet, so only `service_role` in server-side code can read/write) — no new
  RLS policies were needed, even for reads.
- **Same Supabase project as `heart-comm-db`** (project "HC Essentials", ref
  `ppxlhmklrzabcgypnbqa`), same schema: `languages`, `people`, `programs`,
  `program_instances`, `registrations` (see that repo's
  `supabase/migrations/` for full DDL). This app added one column to that
  shared schema: `program_instances.registration_open` (migration
  `20260719085043_add_registration_open_flag.sql` in `heart-comm-db`) — see
  "Opening/closing registration" below.

## Where each field goes

Mirrors the shape `heart-comm-db`'s import scripts already use, so form
submissions and historically-imported spreadsheet rows land in the same
structure:

| Form field | Destination |
|---|---|
| Email, First Name, WhatsApp/Mobile, Heartfulness ID, Center, Zone, Language | `people` (upserted by normalized email) |
| Initials, Age, Gender, "know English?", WhatsApp-group answer, the 3 consents, Comments | `registrations.answers` (JSONB) |
| Selected program instance | `registrations.program_instance_id` (instance must already exist with `registration_open = true` — this app no longer creates or upserts instances) |

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

## Opening/closing registration

**Registration is open/closed per *instance*, not per language** — a
language can have zero, one, or several instances open at once (e.g. a new
batch starting while an older one is still wrapping up), so the flag lives
on `program_instances.registration_open` in Supabase, not in this app's
code. To open a new batch or close one out:

Easiest done via the **HC-Admin** dashboard (create/toggle instances there
directly), or with SQL:

```sql
-- Open a batch for registration (creating it first if it doesn't exist yet)
-- Note: mode lives on `programs`, not `program_instances` -- hc_essentials
-- is always 'online', so it's implied by program_id, not set here.
insert into program_instances (program_id, code, name, language_id, session_count, registration_open, metadata)
values (
  (select id from programs where code = 'hc_essentials'),
  'ES16-TAMIL', 'HC Essentials ES16 (Tamil)',
  (select id from languages where code = 'ta'),
  8, true,
  '{"schedule": "...", "registration_deadline": "2026-09-01"}'::jsonb
)
on conflict (code) do update set registration_open = true;

-- Close one out
update program_instances set registration_open = false where code = 'ES15-TAMIL';
```

`GET /api/instances` ([src/app/api/instances/route.ts](src/app/api/instances/route.ts))
queries this live on every page load — no redeploy needed to open/close a
batch. `metadata.schedule` / `metadata.registration_deadline` (both plain
strings, optional) are shown on the form if present. If more than one
instance is open for the same language at once, the form shows a "choose a
batch" selector; with exactly one, it's auto-selected.

Only **ES15 Tamil (Mar–Apr 2026)** is open as of 2026-07-19.

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
