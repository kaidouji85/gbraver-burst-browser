/** タイムスケールボタンモデル */
export type TimeScaleButtonModel = {
  /** タイムスケール */
  timeScale: number;

  /** ボタンのスケール */
  scale: number;

  /** 透明度 */
  opacity: number;

  /** 操作不可能フラグ、trueで操作不可能 */
  disabled: boolean;
};
