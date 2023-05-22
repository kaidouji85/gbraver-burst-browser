/** パイロットボタン モデル */
export type PilotButtonModel = {
  /** 透明度 */
  opacity: number;
  /**
   * 押下通知が無効であるか否か、trueで通知不可能
   * 表示、非表示アニメーション再生中、あるいは非表示時に本プロパティにtrueをセットして、
   * パイロットボタンが反応しないようにする
   */
  isPushNotifierDisabled: boolean;
  /** パイロットボタンが操作不可能であるか否か、trueで操作不可能である */
  disabled: boolean;
  /** 拡大率 */
  scale: number;
  /** パイロットスキル使用可能フラグ、trueで使用可能 */
  canPilot: boolean;
};
