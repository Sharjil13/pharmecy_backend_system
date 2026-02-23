import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
export const cookieExtractor = (req: Request): string | null => {
  // 1️⃣ Try Authorization header first
  const headerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (headerToken) return headerToken;

  // 2️⃣ Then try cookie
  const cookieToken = req?.cookies?.token;
  if (cookieToken) return cookieToken;

  return null; // no token found
};
