import { EventBus } from '../domain/EventBus';
import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  async publish(event: DomainEvent): Promise<void> {
    const eventHandlers = this.handlers.get(event.eventName) || [];
    for (const handler of eventHandlers) {
      await handler.handle(event);
    }
  }

  subscribe(event: DomainEvent, handler: EventHandler): void {
    const eventHandlers = this.handlers.get(event.eventName) || [];
    eventHandlers.push(handler);
    this.handlers.set(event.eventName, eventHandlers);
  }
}
