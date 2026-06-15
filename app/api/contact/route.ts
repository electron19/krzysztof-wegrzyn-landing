import { NextRequest, NextResponse } from "next/server";

import { ContactSchema } from "@/lib/contact-schema";
import { checkContactRateLimit } from "@/lib/rate-limit";
import { getClientIp, hashClientIp, trimHeaderValue } from "@/lib/request";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { ContactResponse } from "@/types/contact";
import type { LeadInsert } from "@/types/database";

export const runtime = "nodejs";

const jsonResponse = (payload: ContactResponse, status: number) =>
  NextResponse.json(payload, { status });

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json().catch(() => null);
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonResponse(
        {
          success: false,
          message: "Sprawdź poprawność danych w formularzu.",
        },
        400,
      );
    }

    const contact = parsed.data;

    if (contact.website.trim().length > 0) {
      console.warn("Rejected contact form honeypot submission.");
      return jsonResponse(
        {
          success: false,
          message: "Nie udało się wysłać formularza.",
        },
        400,
      );
    }

    const ipHash = hashClientIp(getClientIp(request));
    const rateLimit = await checkContactRateLimit(ipHash);

    if (!rateLimit.allowed) {
      const retryAfter = Math.max(
        1,
        Math.ceil((new Date(rateLimit.reset_at).getTime() - Date.now()) / 1000),
      );

      return NextResponse.json<ContactResponse>(
        {
          success: false,
          message: "Zbyt wiele zgłoszeń. Spróbuj ponownie za kilka minut.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        },
      );
    }

    const supabase = getSupabaseAdminClient();
    const lead: LeadInsert = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? null,
      company: contact.company ?? null,
      message: contact.message,
      consent: contact.consent,
      source: "website",
      ip_hash: ipHash,
      user_agent: trimHeaderValue(request.headers.get("user-agent"), 500),
      referrer: trimHeaderValue(request.headers.get("referer"), 1000),
      metadata: {
        path: request.nextUrl.pathname,
        rate_limit_remaining: rateLimit.remaining,
      },
      email_notification_status: "not_configured",
    };

    const { error } = await supabase.from("leads").insert(lead);

    if (error) {
      throw error;
    }

    return jsonResponse({ success: true }, 200);
  } catch (error: unknown) {
    console.error("Contact form submission failed.", error);

    return jsonResponse(
      {
        success: false,
        message:
          "Nie udało się wysłać formularza. Spróbuj ponownie albo napisz bezpośrednio na e-mail.",
      },
      500,
    );
  }
}
