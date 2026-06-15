import "server-only";

import { createHash } from "node:crypto";

import type { NextRequest } from "next/server";

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function hashClientIp(ipAddress: string): string {
  const secret = process.env.CONTACT_IP_HASH_SECRET;

  if (!secret || secret.length < 16) {
    throw new Error("CONTACT_IP_HASH_SECRET is not configured.");
  }

  return createHash("sha256")
    .update(secret)
    .update("|")
    .update(ipAddress)
    .digest("hex");
}

export function trimHeaderValue(
  value: string | null,
  maxLength: number,
): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLength) : null;
}
