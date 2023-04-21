import { ButtonConfig } from "./button-config";
import { disabledBattery, enabledBatttery, getBattery, invisibleBattery, visibleBattery, visibleBatteryAsFirst, visibleBatteryAsLast } from "./dom/battery-button";
import { MiniControllerProps } from "./props";

/**
 * ボタン設定をコンポネントに反映される
 * @param props コンポネントプロパティ
 * @param config ボタン設定
 */
export function engageButtonConfig(props: MiniControllerProps, config: ButtonConfig): void {
  props.batteryButtons.forEach(batteryButton => {
    const battery = getBattery(batteryButton);
    if (battery === null) {
      return;
    }

    const isVisible = battery <= config.maxBattery;
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

    const isEnabled = battery <= config.battery;
    if (isEnabled) {
      enabledBatttery(batteryButton);
    } else {
      disabledBattery(batteryButton);
    }
  });
}