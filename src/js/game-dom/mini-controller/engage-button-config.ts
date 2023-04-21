import { ButtonConfig } from "./button-config";
import { getBattery, invisibleBattery, visibleBattery, visibleBatteryAsFirst, visibleBatteryAsLast } from "./dom/battery-button";
import { MiniControllerProps } from "./props";
import { getBatteryButtons } from "./get-battery-buttons";

/**
 * ボタン設定をコンポネントに反映される
 * @param props コンポネントプロパティ
 * @param config ボタン設定
 */
export function engageButtonConfig(props: MiniControllerProps, config: ButtonConfig): void {
  getBatteryButtons(props).forEach(batteryButton => {
    const battery = getBattery(batteryButton);
    if (battery === null) {
      return;
    }

    const isVisible = battery <= config.battery;
    const isFirst = battery === 0;
    const isLast = battery === config.maxBattery;
    if (isVisible && isFirst) {
      visibleBatteryAsFirst(batteryButton);
    } else if (isVisible && isLast) {
      visibleBatteryAsLast(batteryButton);
    } else if (isVisible) {
      visibleBattery(batteryButton);
    } else {
      invisibleBattery(batteryButton);
    }
  });
}