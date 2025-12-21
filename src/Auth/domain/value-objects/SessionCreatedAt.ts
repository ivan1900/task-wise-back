export default class SessionCreatedAt {
  public readonly value: Date;
  constructor(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('SessionCreatedAt must be a valid Date');
    }
    this.value = value;
  }
}
