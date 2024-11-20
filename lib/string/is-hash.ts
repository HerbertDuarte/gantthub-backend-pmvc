export function isHash(password: string): boolean {
  const bcryptHashRegex = /^\$2[aby]\$.{56}$/;
  return bcryptHashRegex.test(password);
}
