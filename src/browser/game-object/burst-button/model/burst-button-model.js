// @flow

/** バーストボタンのモデル */
export type BurstButtonModel = {
  /** 透明度 */
  opacity: number,
  /** 操作不可能フラグ、trueでボタンを操作できない */
  disabled: boolean,
  /** バースト可能フラグ、trueでバースト可能 */
  canBurst: boolean,
};