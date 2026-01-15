import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserFinder } from 'src/User/application/UserFinder.service';
import GenerateJWT from '../domain/GenerateJTW.service';
import AuthRepository from '../infraestructure/Auth.repository';
import Session from '../domain/session';
import { UserWasLoggedEvent } from 'src/Shared/domain/events/UserWasLogged.event';
import { EventBus } from 'src/Shared/domain/EventBus';
import { UserCreator } from 'src/User/application/UserCreator.service';
import { UserResponseDto } from 'src/User/application/dto/UserResponse.dto';
import { GoogleUser } from 'src/Shared/domain/googleAuth/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userFinder: UserFinder,
    private readonly userCreator: UserCreator,
    private readonly repository: AuthRepository,
    @Inject(EventBus) private readonly eventBus: EventBus,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userFinder.byEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokensAndSession(user.id, user.email);
  }

  async validateGoogleUser(profile: {
    email: string;
    googleId: string;
    name: string;
  }): Promise<UserResponseDto> {
    let user = await this.userFinder.byEmail(profile.email);

    if (!user) {
      user = (await this.userCreator.createSourceGoogle(profile)).toPrimitives();
    }

    return user;
  }

  async login(user: GoogleUser): Promise<{ access_token: string; refresh_token: string }> {
    return this.generateTokensAndSession(Number(user.id), user.email);
  }

  private async generateTokensAndSession(userId: number, email: string) {
    const session = await this.repository.findSessionByUserId(userId);
    if (session) {
      await this.repository.removeSessionsByUserId(userId);
    }

    const accessToken = GenerateJWT.accessToken(userId, email);
    const refreshToken = GenerateJWT.refreshToken(userId, email);
    const newSession = Session.fromPrimitives({
      id: null,
      userId: userId,
      refreshToken: refreshToken,
      valid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.repository.saveSession(newSession);

    const event = new UserWasLoggedEvent(userId.toString());
    await this.eventBus.publish(event);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
