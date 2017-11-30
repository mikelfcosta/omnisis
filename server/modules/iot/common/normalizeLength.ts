export default function normalizeLength(string: string) {
  let normalizedString = string;
  for (let i = normalizedString.length; i < 16; i += 1) {
    normalizedString += ' ';
  }
  return normalizedString;
}