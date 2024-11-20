export function hasNumber(password: string): boolean {
  return /[0-9]/.test(password);
}
