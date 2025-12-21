import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/User.repository';
import { UserResponseDto } from './dto/UserResponse.dto';

@Injectable()
export class UserFinder {
  constructor(private readonly usersRepository: UserRepository) {}

  async byEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findUserByCredentials(email);
    if (!user) {
      return null;
    }

    return user.toPrimitives();
  }
}
