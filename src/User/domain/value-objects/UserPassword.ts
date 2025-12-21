import { StringValueObject } from 'src/Shared/value-objects/stringValueObject';
import * as bcrypt from 'bcrypt';

export default class UserPassword extends StringValueObject {
  static fromTextPlain(value: string): UserPassword {
    const password = bcrypt.hashSync(value, 10);
    return new UserPassword(password);
  }

  static fromHash(value: string): UserPassword {
    return new UserPassword(value);
  }

  async validate(plainText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, this.value);
  }
}
