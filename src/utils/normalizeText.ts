export default function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}
