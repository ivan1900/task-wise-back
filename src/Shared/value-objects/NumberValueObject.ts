import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }

  isSmallerThan(other: NumberValueObject): boolean {
    return this.value < other.value;
  }
}
