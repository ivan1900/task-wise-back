import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import AuthRepository from './infraestructure/Auth.repository';
import { DDBBModule } from 'src/DDBB/DDBB.module';
import { AuthService } from './application/Auth.service';
import { UserModule } from 'src/User/User.module';
import { RefreshService } from './application/Refresh.service';
import { SharedModule } from 'src/Shared/Shared.module';

@Module({
  imports: [DDBBModule, UserModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, RefreshService],
})
export class AuthModule {}
