// @flow

/**
 * 排他制御を行う
 */
export class Exclusive {
  _canExecute: boolean;

  /**
   * コンストラクタ
   */
  constructor() {
    this._canExecute = true;
  }

  /**
   * 引数で指定した関数を排他制御をつけて実行する
   *
   * @param fn 実行内容
   * @return 処理結果
   */
  async execute(fn: () => Promise<void>): Promise<void> {
    if (!this._canExecute) {
      return;
    }

    this._canExecute = false;
    await fn();
    this._canExecute = true;
  }
}