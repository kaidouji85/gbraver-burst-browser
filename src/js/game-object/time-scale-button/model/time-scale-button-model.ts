/** タイムスケールボタンモデル */
export type TimeScaleButtonModel = {
  /** タイムスケール */
  timeScale: number;
  /** ボタンのスケール */
  scale: number;
  /** 不透明度 */
  opacity: number;
  /**
   * 押下通知が無効であるか否か、trueで通知不可能
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * タイムスケールボタンが反応しないようにする
   */
  isPushNotifierDisabled: boolean;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
};
