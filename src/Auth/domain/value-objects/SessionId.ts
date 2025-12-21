export default class SessionId {
  public readonly value: number;
  constructor(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('SessionId must be a valid number');
    }
    this.value = value;
  }
}
