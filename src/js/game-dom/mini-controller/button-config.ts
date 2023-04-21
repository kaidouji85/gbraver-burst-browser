/** コントローラーのボタン設定 */
export type ButtonConfig = {
  /** 最大バッテリー */
  maxBattery: number;
  /** 現在のバッテリー値 */
  battery: number;
  /** バースト可能であるか、trueで可能 */
  canBurst: boolean;
  /** パイロットスキル可能であるか、trueで可能 */
  canPilotSkill: boolean;
};
