// @flow

/** スライダー当たり判定モデル */
export type SliderOperationModel = {
  /** 最後にタッチした値、未入力の場合null、undefinedがセットされる*/
  lastValue: ?number,
  /** 操作無効フラグ、trueで操作不可能 */
  isDisabled: boolean
};