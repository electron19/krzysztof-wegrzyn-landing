import { z } from "zod";

const optionalText = (maxLength: number) =>
  z.preprocess((value: unknown) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }, z.string().max(maxLength).optional());

export const ContactSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: optionalText(60),
  company: optionalText(180),
  message: z.string().trim().min(5).max(5000),
  consent: z.boolean().optional().default(false),
  website: z.string().optional().default(""),
});

export type ValidContactInput = z.infer<typeof ContactSchema>;
