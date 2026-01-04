import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(event: DomainEvent, handler: EventHandler): void;
}

export const EventBus = Symbol('EventBus');
