/** タイムスケールボタンモデル */
export type TimeScaleButtonModel = {
  /** タイムスケール */
  timeScale: number;
  /** ボタンのスケール */
  scale: number;
  /** 不透明度 */
  opacity: number;
  /**
   * 押下通知を止めるか否か、trueで通知を止める
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * タイムスケールボタンが反応しないようにする
   */
  shouldPushNotifierStop: boolean;
};
