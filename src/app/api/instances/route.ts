import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { LanguageCode } from "@/config/batches";
import type { OpenInstance } from "@/lib/instances";

// Lists program_instances currently open for registration
// (program=hc_essentials, registration_open=true). This is a read, but it
// still goes through the service_role client server-side rather than
// exposing an anon key to the browser — see src/lib/supabase-admin.ts.
//
// No `mode` filter here: `mode` lives on `programs` now (moved there in
// heart-comm-db migration 20260719105526_move_mode_to_programs.sql, since
// it's a property of the program type, not the instance), and scoping to
// `program_id` for `hc_essentials` already guarantees `mode = 'online'`.
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { data: program, error: progErr } = await supabaseAdmin
      .from("programs")
      .select("id")
      .eq("code", "hc_essentials")
      .maybeSingle();
    if (progErr) throw progErr;
    if (!program) return NextResponse.json({ instances: [] });

    const { data: instances, error: instErr } = await supabaseAdmin
      .from("program_instances")
      .select("id, code, name, language_id, session_count, metadata")
      .eq("program_id", program.id)
      .eq("registration_open", true);
    if (instErr) throw instErr;

    const { data: languages, error: langErr } = await supabaseAdmin
      .from("languages")
      .select("id, code");
    if (langErr) throw langErr;
    const languageCodeById = new Map<string, LanguageCode>(
      (languages ?? []).map((l) => [l.id as string, l.code as LanguageCode])
    );

    const result: OpenInstance[] = (instances ?? []).map((inst) => {
      const metadata = (inst.metadata ?? {}) as Record<string, unknown>;
      return {
        id: inst.id,
        code: inst.code,
        name: inst.name,
        languageCode: languageCodeById.get(inst.language_id) ?? null,
        sessionCount: inst.session_count,
        schedule: typeof metadata.schedule === "string" ? metadata.schedule : null,
        registrationDeadline:
          typeof metadata.registration_deadline === "string"
            ? metadata.registration_deadline
            : null,
      };
    });

    return NextResponse.json({ instances: result });
  } catch (err) {
    console.error("Failed to fetch open instances:", err);
    return NextResponse.json(
      { error: "Failed to load available programs." },
      { status: 500 }
    );
  }
}
