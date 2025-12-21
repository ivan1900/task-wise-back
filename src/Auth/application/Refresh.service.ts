import { Injectable } from '@nestjs/common';
import AuthRepository from '../infraestructure/Auth.repository';
import GenerateJWT from '../domain/GenerateJTW.service';
import { UserFinder } from 'src/User/application/UserFinder.service';

@Injectable()
export class RefreshService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userFinder: UserFinder,
  ) {}

  async refreshToken(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const session = await this.authRepository.findSessionByRefreshToken(refreshToken);
    if (!session || !session.refreshToken.isValid() || !session.valid.value) {
      throw new Error('Invalid refresh token');
    }

    const payload = session.refreshToken.getPayload();

    const user = await this.userFinder.byEmail(payload.email);
    if (!user) {
      throw new Error('User not found');
    }

    const access_token = GenerateJWT.accessToken(user.id, user.email);
    const updatedSession = session.renewRefreshToken(payload);

    await this.authRepository.updateSession(updatedSession);

    return { access_token, refresh_token: updatedSession.refreshToken.value };
  }
}
