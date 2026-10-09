import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ubah nomor telepon format bebas ("+62 813-8899-7722", "0813 8899 7722")
// menjadi format internasional tanpa tanda baca yang dibutuhkan wa.me.
export function normalizeWhatsAppNumber(raw?: string | null): string {
  let digits = (raw ?? "").replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = `62${digits.slice(1)}`;
  }
  return digits;
}

export function waLink(raw?: string | null, message = ""): string {
  const number = normalizeWhatsAppNumber(raw);
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}
