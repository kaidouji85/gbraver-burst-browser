/** ダメージ予想 モデル */
export type PredicatedDamageModel = {
  /** 表示するダメージ */
  damage: number;
  /** 不透明度 */
  opacity: number;
  /**
   * 押下通知を止めるか否か、trueで通知を止める
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * バーストボタンが反応しないようにする
   */
  shouldPushNotifierStop: boolean;
  /** バトルシュミレーターアイコンのスケール */
  battleSimulatorIconScale: number;
};
