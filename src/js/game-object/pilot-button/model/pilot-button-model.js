// @flow

/**
 * パイロットボタン モデル
 */
export type PilotButtonModel = {
  /** 透明度 */
  opacity: number,
  /** 操作不可能フラグ、trueでボタンを操作できない */
  disabled: boolean,
  /** 拡大率 */
  scale: number,
  /** パイロットスキル使用可能フラグ、trueで使用可能 */
  canPilot: boolean,
};
