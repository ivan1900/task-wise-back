import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload.type';
import GenerateJWT from '../GenerateJTW.service';

export default class SessionRefreshToken {
  public readonly value: string;

  constructor(value: string) {
    if (!value || typeof value !== 'string') {
      throw new Error('SessionRefreshToken must be a non-empty string');
    }
    this.value = value;
  }

  isValid(): boolean {
    try {
      jwt.verify(this.value, process.env.REFRESH_TOKEN_SECRET!);
      return true;
    } catch {
      return false;
    }
  }

  getPayload(): JwtPayload {
    return jwt.verify(this.value, process.env.REFRESH_TOKEN_SECRET!) as unknown as JwtPayload;
  }

  renew(payload: JwtPayload): SessionRefreshToken {
    const refresh_token = GenerateJWT.refreshToken(payload.sub, payload.email);
    return new SessionRefreshToken(refresh_token);
  }
}
