/** バーストボタンのモデル */
export type BurstButtonModel = {
  /** 不透明度 */
  opacity: number;
  /**
   * 押下通知を止めるか否か、trueで通知を止める
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * バーストボタンが反応しないようにする
   */
  shouldPushNotifierStop: boolean;
  /** 拡大率 */
  scale: number;
  /** ゲーム的にバースト発動可能であるか否か、trueで発動可能 */
  canActivateBurst: boolean;
};
