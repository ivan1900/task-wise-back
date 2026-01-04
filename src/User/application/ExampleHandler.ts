import { EventHandler } from 'src/Shared/domain/EventHandler';
import { UserWasLoggedEvent } from 'src/Shared/domain/events/UserWasLogged.event';

export class ExampleHandler implements EventHandler {
  async handle(event: UserWasLoggedEvent): Promise<void> {
    console.log(`User with ID ${event.userId} logged in at ${event.occurredOn.toISOString()}`);
  }
}
