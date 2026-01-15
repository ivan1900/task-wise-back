import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './Auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      clientID: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const user = await this.authService.validateGoogleUser({
      email: emails[0].value,
      googleId: profile.id,
      name: `${name.givenName} ${name.familyName}`,
    });
    done(null, user);
  }
}
