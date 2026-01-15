import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/User.repository';
import User from '../domain/User';
import { v4 as uuidv4 } from 'uuid';
import UserId from '../domain/value-objects/UserId';
import UserEmail from '../domain/value-objects/UserEmail';
import UserPassword from '../domain/value-objects/UserPassword';
import UserIsActive from '../domain/value-objects/UserIsActive';
import { UserUuid } from '../domain/value-objects/UserUuid';

@Injectable()
export class UserCreator {
  constructor(private readonly repository: UserRepository) {}

  async createSourceGoogle(profile: {
    email: string;
    googleId: string;
    name: string;
  }): Promise<User> {
    const user = User.create({
      id: new UserId(0), // ID will be assigned by DB
      email: new UserEmail(profile.email),
      password: new UserPassword(uuidv4()), // Random password for OAuth users
      isActive: new UserIsActive(true),
      uuid: new UserUuid(uuidv4()),
      googleId: profile.googleId,
    });

    await this.repository.save(user);

    // Fetch the saved user to get the DB ID
    const savedUser = await this.repository.findUserByCredentials(profile.email);
    if (!savedUser) {
      throw new Error('User creation failed');
    }

    return savedUser;
  }
}
