import { DomainEvent } from './DomainEvent';

export interface EventHandler {
  handle(event: DomainEvent): Promise<void>;
}
