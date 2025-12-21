import { Module } from '@nestjs/common';
import { UserFinder } from './application/UserFinder.service';
import { DDBBModule } from 'src/DDBB/DDBB.module';
import { UserRepository } from './infrastructure/User.repository';
import { UserController } from './User.controller';

@Module({
  imports: [DDBBModule],
  controllers: [UserController],
  providers: [UserFinder, UserRepository],
  exports: [UserFinder],
})
export class UserModule {}
