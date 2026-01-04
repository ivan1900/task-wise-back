import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserFinder } from 'src/User/application/UserFinder.service';
import GenerateJWT from '../domain/GenerateJTW.service';
import AuthRepository from '../infraestructure/Auth.repository';
import Session from '../domain/session';
import { UserWasLoggedEvent } from 'src/Shared/domain/events/UserWasLogged.event';
import { EventBus } from 'src/Shared/domain/EventBus';

@Injectable()
export class AuthService {
  constructor(
    private readonly userFinder: UserFinder,
    private readonly repository: AuthRepository,
    @Inject(EventBus) private readonly eventBus: EventBus,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userFinder.byEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = await this.repository.findSessionByUserId(user.id);
    if (session) {
      await this.repository.removeSessionsByUserId(user.id);
    }

    const accessToken = GenerateJWT.accessToken(user.id, user.email);
    const refreshToken = GenerateJWT.refreshToken(user.id, user.email);
    const newSession = Session.fromPrimitives({
      id: null,
      userId: user.id,
      refreshToken: refreshToken,
      valid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.repository.saveSession(newSession);

    const event = new UserWasLoggedEvent(user.id.toString());
    await this.eventBus.publish(event);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
