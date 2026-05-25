/** Build tel: link from a phone string. */
export function phoneHref(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  const normalized = trimmed.replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "";
}

/** Build WhatsApp chat link from number or existing URL. */
export function whatsappHref(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function hasContactInfo(job: {
  contact_phone: string | null;
  contact_whatsapp: string | null;
}): boolean {
  return Boolean(
    job.contact_phone?.trim() || job.contact_whatsapp?.trim(),
  );
}
