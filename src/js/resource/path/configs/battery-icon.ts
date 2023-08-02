import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** バッテリーアイコン パス設定 */
export const BatteryIconPathConfigs: PathConfig[] = [
  {
    id: PathIds.BATTERY_ICON,
    path: (root) => `${root.get()}/battery-icon.svg`,
  },
];