import { BatteryButtonConfig } from "./battery-button/config";

/** コントローラーのボタン設定 */
export type ButtonConfig = BatteryButtonConfig & {
  /** バースト可能であるか、trueで可能 */
  canBurst: boolean;
  /** パイロットスキル可能であるか、trueで可能 */
  canPilotSkill: boolean;
};
