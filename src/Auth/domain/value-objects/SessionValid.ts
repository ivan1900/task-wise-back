export default class SessionValid {
  public readonly value: boolean;
  constructor(value: boolean) {
    if (typeof value !== 'boolean') {
      throw new Error('SessionValid must be a boolean');
    }
    this.value = value;
  }
}
