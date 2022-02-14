export class State {
  private _level: string;
  private _wordRate: string;

  constructor() {
    this._level = 'easy';
    this._wordRate = 'low';
  }

  public get level() {
    return this._level;
  }
  public set level(val: string) {
    this._level = val;
  }

  public get wordRate(): string {
    return this._wordRate;
  }
  public set wordRate(value: string) {
    this._wordRate = value;
  }
}
