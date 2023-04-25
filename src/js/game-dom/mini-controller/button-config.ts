import { BatteryButtonConfig } from "./battery-button/config";
import { BurstButtonConfig } from "./burst-button/config";

/** コントローラーのボタン設定 */
export type ButtonConfig = BatteryButtonConfig &
  BurstButtonConfig & {
    /** パイロットスキル可能であるか、trueで可能 */
    canPilotSkill: boolean;
  };
