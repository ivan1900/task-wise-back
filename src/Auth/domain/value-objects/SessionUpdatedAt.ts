export default class SessionUpdatedAt {
  public readonly value: Date;
  constructor(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('SessionUpdatedAt must be a valid Date');
    }
    this.value = value;
  }
}
