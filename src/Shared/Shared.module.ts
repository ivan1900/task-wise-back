import { Module } from '@nestjs/common';
import { EventBus } from './domain/EventBus';
import { InMemoryEventBus } from './domain/InMemoryEventBus';

@Module({
  providers: [
    {
      provide: EventBus,
      useClass: InMemoryEventBus,
    },
  ],
  exports: [EventBus],
})
export class SharedModule {}
