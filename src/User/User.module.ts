import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { UserFinder } from './application/UserFinder.service';
import { DDBBModule } from 'src/DDBB/DDBB.module';
import { UserRepository } from './infrastructure/User.repository';
import { UserController } from './User.controller';
import { SharedModule } from 'src/Shared/Shared.module';
import { ExampleHandler } from './application/ExampleHandler';
import { UserWasLoggedEvent } from 'src/Shared/domain/events/UserWasLogged.event';
import { EventBus } from 'src/Shared/domain/EventBus';
import { UserCreator } from './application/UserCreator.service';

@Module({
  imports: [DDBBModule, SharedModule],
  controllers: [UserController],
  providers: [UserFinder, UserRepository, UserCreator],
  exports: [UserFinder, UserCreator],
})
export class UserModule implements OnModuleInit {
  constructor(@Inject(EventBus) private readonly eventBus: EventBus) {}

  onModuleInit() {
    const handler = new ExampleHandler();
    this.eventBus.subscribe(new UserWasLoggedEvent(''), handler); // Register the handler for UserWasLoggedEvent
  }
}
