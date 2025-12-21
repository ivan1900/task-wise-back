import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DDBB/Prisma.service';
import Session from '../domain/session';

@Injectable()
export default class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findSessionByRefreshToken(refreshToken: string): Promise<Session | null> {
    const session = await this.prismaService.session.findUnique({
      where: { refresh_token: refreshToken },
    });

    if (!session) {
      return null;
    }

    return Session.fromPrimitives({
      id: session.id,
      userId: session.user_id,
      refreshToken: session.refresh_token,
      valid: session.valid,
      createdAt: session.created_at!,
      updatedAt: session.updated_at!,
    });
  }

  async findSessionByUserId(id: number): Promise<Session | null> {
    const session = await this.prismaService.session.findFirst({
      where: { user_id: id },
    });

    if (!session) {
      return null;
    }

    return Session.fromPrimitives({
      id: session.id,
      userId: session.user_id,
      refreshToken: session.refresh_token,
      valid: session.valid,
      createdAt: session.created_at!,
      updatedAt: session.updated_at!,
    });
  }

  async saveSession(session: Session): Promise<void> {
    const primitives = session.toPrimitives();
    await this.prismaService.session.create({
      data: {
        user_id: primitives.userId,
        refresh_token: primitives.refreshToken,
        valid: primitives.valid,
        created_at: primitives.createdAt,
        updated_at: primitives.updatedAt,
      },
    });
  }

  async updateSession(session: Session): Promise<void> {
    const primitives = session.toPrimitives();
    await this.prismaService.session.update({
      where: { id: primitives.id! },
      data: {
        refresh_token: primitives.refreshToken,
        valid: primitives.valid,
      },
    });
  }

  async removeSessionsByUserId(userId: number): Promise<void> {
    await this.prismaService.session.deleteMany({
      where: { user_id: userId },
    });
  }
}
