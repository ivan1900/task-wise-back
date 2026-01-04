import { DomainEvent } from '../DomainEvent';

export class UserWasLoggedEvent implements DomainEvent {
  public readonly eventName = 'UserWasLogged';
  public readonly occurredOn: Date;

  constructor(public readonly userId: string) {
    this.occurredOn = new Date();
  }
}
