export default class SessionUserId {
  public readonly value: number;
  constructor(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('SessionUserId must be a valid number');
    }
    this.value = value;
  }
}
