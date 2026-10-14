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

/**
 * Ambil URL embed Google Maps dari input admin: bisa kode `<iframe ...>` hasil
 * "Bagikan > Sematkan peta" atau URL-nya saja. Hanya https://www.google.com/maps/embed
 * yang diterima; selain itu null (mencegah iframe ke domain sembarang).
 */
export function parseMapsEmbedUrl(input?: string | null): string | null {
  const raw = (input ?? '').trim();
  if (!raw) return null;

  const srcMatch = raw.match(/src\s*=\s*["']([^"']+)["']/i);
  const candidate = (srcMatch ? srcMatch[1] : raw).replace(/&amp;/g, '&');

  try {
    const url = new URL(candidate);
    if (
      url.protocol === 'https:' &&
      url.hostname === 'www.google.com' &&
      url.pathname.startsWith('/maps/embed')
    ) {
      return url.toString();
    }
  } catch {
    // bukan URL valid
  }
  return null;
}
