import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import AuthRepository from './infraestructure/Auth.repository';
import { DDBBModule } from 'src/DDBB/DDBB.module';
import { AuthService } from './application/Auth.service';
import { UserModule } from 'src/User/User.module';
import { RefreshService } from './application/Refresh.service';
import { SharedModule } from 'src/Shared/Shared.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './application/GoogleStrategy';

@Module({
  imports: [DDBBModule, UserModule, SharedModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, RefreshService, GoogleStrategy],
})
export class AuthModule {}
