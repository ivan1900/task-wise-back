import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DDBB/Prisma.service';
import User from '../domain/User';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByCredentials(email: string): Promise<User | null> {
    const user = await this.prisma.app_user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return User.fromPrimitives({
      id: user.id.toString(),
      email: user.email,
      password: user.password,
      isActive: user.is_active ?? false,
      uuid: user.uuid,
      googleId: user.google_id,
    });
  }

  async save(user: User): Promise<void> {
    const primitives = user.toPrimitives();
    
    await this.prisma.app_user.upsert({
      where: { email: primitives.email },
      update: {
        name: primitives.email.split('@')[0], // Fallback name
        google_id: primitives.googleId,
        password: primitives.password,
        is_active: primitives.isActive,
      },
      create: {
        name: primitives.email.split('@')[0], // Fallback name
        email: primitives.email,
        password: primitives.password,
        uuid: primitives.uuid,
        google_id: primitives.googleId,
        is_active: primitives.isActive,
      },
    });
  }
}
