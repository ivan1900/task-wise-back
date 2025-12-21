import SessionId from './value-objects/SessionId';
import SessionUserId from './value-objects/SessionUserId';
import SessionRefreshToken from './value-objects/SessionRefreshToken';
import SessionValid from './value-objects/SessionValid';
import SessionCreatedAt from './value-objects/SessionCreatedAt';
import SessionUpdatedAt from './value-objects/SessionUpdatedAt';
import { JwtPayload } from './types/JwtPayload.type';

interface Props {
  id: SessionId | null;
  userId: SessionUserId;
  refreshToken: SessionRefreshToken;
  valid: SessionValid;
  createdAt: SessionCreatedAt;
  updatedAt: SessionUpdatedAt;
}

export default class Session {
  readonly id: SessionId | null;
  readonly userId: SessionUserId;
  readonly refreshToken: SessionRefreshToken;
  readonly valid: SessionValid;
  readonly createdAt: SessionCreatedAt;
  readonly updatedAt: SessionUpdatedAt;

  constructor(props: Props) {
    this.id = props.id;
    this.userId = props.userId;
    this.refreshToken = props.refreshToken;
    this.valid = props.valid;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Props): Session {
    return new Session(props);
  }

  static fromPrimitives(primitives: {
    id: number | null;
    userId: number;
    refreshToken: string;
    valid: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): Session {
    return new Session({
      id: primitives.id === null ? null : new SessionId(primitives.id),
      userId: new SessionUserId(primitives.userId),
      refreshToken: new SessionRefreshToken(primitives.refreshToken),
      valid: new SessionValid(primitives.valid),
      createdAt: new SessionCreatedAt(primitives.createdAt),
      updatedAt: new SessionUpdatedAt(primitives.updatedAt),
    });
  }

  toPrimitives() {
    return {
      id: this.id ? this.id.value : null,
      userId: this.userId.value,
      refreshToken: this.refreshToken.value,
      valid: this.valid.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  renewRefreshToken(newToken: JwtPayload) {
    return new Session({
      id: this.id,
      userId: this.userId,
      refreshToken: this.refreshToken.renew(newToken),
      valid: new SessionValid(true),
      createdAt: this.createdAt,
      updatedAt: new SessionUpdatedAt(new Date()),
    });
  }
}
