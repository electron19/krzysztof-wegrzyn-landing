import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase";
import type { ContactRateLimitResult } from "@/types/database";

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_SECONDS = 600;

export async function checkContactRateLimit(
  ipHash: string,
): Promise<ContactRateLimitResult> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase.rpc("check_contact_rate_limit", {
    p_ip_hash: ipHash,
    p_limit: CONTACT_LIMIT,
    p_window_seconds: CONTACT_WINDOW_SECONDS,
  });

  if (error) {
    throw error;
  }

  const limitResult = data?.[0];

  if (!limitResult) {
    throw new Error("Rate limit function returned no result.");
  }

  return limitResult;
}
