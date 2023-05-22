/** バーストボタンのモデル */
export type BurstButtonModel = {
  /** 透明度 */
  opacity: number;
  /**
   * 押下通知が無効であるか否か、trueで通知不可能
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * バッテリーセレクタが反応しないようにする
   */
  isPushNotifierDisabled: boolean;
  /** 拡大率 */
  scale: number;
  /** バースト可能フラグ、trueでバースト可能 */
  canBurst: boolean;
};
