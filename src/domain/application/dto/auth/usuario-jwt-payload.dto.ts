export interface UsuarioJWTPayload {
  email: string;
  id: string;
  iat: number;
  exp: number;
  refreshToken: string;
}
