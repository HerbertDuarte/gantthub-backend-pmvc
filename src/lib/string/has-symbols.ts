export function hasSymbols(str: string): boolean {
  return /[\W_]/.test(str);
}
