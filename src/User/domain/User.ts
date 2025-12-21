import UserEmail from './value-objects/UserEmail';
import UserId from './value-objects/UserId';
import UserIsActive from './value-objects/UserIsActive';
import UserPassword from './value-objects/UserPassword';
import { UserUuid } from './value-objects/UserUuid';

interface Props {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  isActive: UserIsActive;
  uuid: UserUuid;
}

export default class User {
  private id: UserId;
  private email: UserEmail;
  private password: UserPassword;
  private isActive: UserIsActive;
  private uuid: UserUuid;

  constructor(props: Props) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.isActive = props.isActive;
    this.uuid = props.uuid;
  }

  static create(props: Props): User {
    return new User(props);
  }

  static fromPrimitives(primitives: {
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    uuid: string;
  }): User {
    return new User({
      id: new UserId(Number(primitives.id)),
      email: new UserEmail(primitives.email),
      password: new UserPassword(primitives.password),
      isActive: new UserIsActive(primitives.isActive),
      uuid: new UserUuid(primitives.uuid),
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      isActive: this.isActive.value,
      uuid: this.uuid.value,
    };
  }
}
