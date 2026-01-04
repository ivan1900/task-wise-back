import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/Auth.module';
import { UserModule } from './User/User.module';
import { DDBBModule } from './DDBB/DDBB.module';
import { SharedModule } from './Shared/Shared.module';

@Module({
  imports: [AuthModule, UserModule, DDBBModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
