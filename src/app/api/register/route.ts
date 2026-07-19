import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { normalizeEmail, normalizePhone } from "@/lib/normalize";
import { BATCHES, LanguageCode } from "@/config/batches";

interface RegisterPayload {
  languageCode: LanguageCode;
  email: string;
  firstName: string;
  initials?: string;
  age?: string;
  gender?: string;
  phone: string;
  heartfulnessId?: string;
  center: string;
  zone?: string;
  knowsEnglish?: string;
  whatsappGroup?: string;
  sessionConsent: boolean;
  videoConsent: boolean;
  contactConsent: boolean;
  disclaimerConsent: boolean;
  comments?: string;
  honey?: string; // honeypot — real users never fill this in
}

export async function POST(req: NextRequest) {
  let body: RegisterPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.honey) {
    // Bot tripped the honeypot — report success without writing anything.
    return NextResponse.json({ ok: true });
  }

  const batch = BATCHES[body.languageCode];
  if (!batch || !batch.isOpen) {
    return NextResponse.json(
      { error: "Registration is not currently open for this language." },
      { status: 400 }
    );
  }

  const email = normalizeEmail(body.email ?? "");
  const missing: string[] = [];
  if (!email) missing.push("email");
  if (!body.firstName?.trim()) missing.push("firstName");
  if (!body.phone?.trim()) missing.push("phone");
  if (!body.center?.trim()) missing.push("center");
  if (!body.sessionConsent) missing.push("sessionConsent");
  if (!body.videoConsent) missing.push("videoConsent");
  if (!body.contactConsent) missing.push("contactConsent");
  if (!body.disclaimerConsent) missing.push("disclaimerConsent");
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: lang, error: langErr } = await supabaseAdmin
      .from("languages")
      .select("id")
      .eq("code", body.languageCode)
      .single();
    if (langErr || !lang) throw langErr ?? new Error("Unknown language code.");

    const { data: program, error: progErr } = await supabaseAdmin
      .from("programs")
      .upsert({ code: "hc_essentials", name: "HC Essentials" }, { onConflict: "code" })
      .select()
      .single();
    if (progErr || !program) throw progErr ?? new Error("Failed to resolve program.");

    const { data: instance, error: instErr } = await supabaseAdmin
      .from("program_instances")
      .upsert(
        {
          program_id: program.id,
          code: batch.code,
          name: batch.name,
          language_id: lang.id,
          mode: "online",
          session_count: batch.sessionCount,
        },
        { onConflict: "code" }
      )
      .select()
      .single();
    if (instErr || !instance) throw instErr ?? new Error("Failed to resolve program instance.");

    const phone = normalizePhone(body.phone);
    const personPayload: Record<string, unknown> = {
      email,
      full_name: body.firstName.trim(),
      first_name: body.firstName.trim(),
      phone,
      heartfulness_id: body.heartfulnessId?.trim() || null,
      center: body.center.trim(),
      zone: body.zone?.trim() || null,
      preferred_language_id: lang.id,
    };
    if (body.phone && !phone) {
      personPayload.needs_review = true;
      personPayload.review_notes = `Phone number could not be normalized: "${body.phone}" — needs manual correction.`;
    }

    const { data: person, error: personErr } = await supabaseAdmin
      .from("people")
      .upsert(personPayload, { onConflict: "email" })
      .select()
      .single();
    if (personErr || !person) throw personErr ?? new Error("Failed to upsert person.");

    const { error: regErr } = await supabaseAdmin.from("registrations").insert({
      person_id: person.id,
      program_instance_id: instance.id,
      submitted_at: new Date().toISOString(),
      answers: {
        initials: body.initials?.trim() || null,
        age: body.age || null,
        gender: body.gender || null,
        knows_english: body.knowsEnglish || null,
        whatsapp_group: body.whatsappGroup || null,
        session_commitment_consent: body.sessionConsent,
        video_on_consent: body.videoConsent,
        contact_consent: body.contactConsent,
        disclaimer_consent: body.disclaimerConsent,
        comments: body.comments?.trim() || null,
      },
      source_sheet: "ESS-Registration app",
    });
    if (regErr) throw regErr;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Registration failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while saving your registration. Please try again." },
      { status: 500 }
    );
  }
}
