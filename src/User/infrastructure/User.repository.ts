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
    });
  }
}
