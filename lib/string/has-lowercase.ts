export function hasLowercase(password: string): boolean {
  return /[a-z]/.test(password);
}
