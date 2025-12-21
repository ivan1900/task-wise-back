import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './types/JwtPayload.type';

export default class GenerateJWT {
  static accessToken(userId: number, email: string): string {
    const payload: JwtPayload = { sub: userId, email: email };
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRATION as jwt.SignOptions['expiresIn']) || '600s',
    });
  }

  static refreshToken(userId: number, email: string): string {
    const payload: JwtPayload = { sub: userId, email: email };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRATION as jwt.SignOptions['expiresIn']) || '7d',
    });
  }
}
