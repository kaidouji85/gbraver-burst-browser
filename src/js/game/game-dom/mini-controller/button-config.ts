import { BatteryButtonConfig } from "./battery-button/config";
import { BurstButtonConfig } from "./burst-button/config";
import { PilotButtonConfig } from "./pilot-button/config";

/** コントローラーのボタン設定 */
export type ButtonConfig = BatteryButtonConfig &
  BurstButtonConfig &
  PilotButtonConfig;
