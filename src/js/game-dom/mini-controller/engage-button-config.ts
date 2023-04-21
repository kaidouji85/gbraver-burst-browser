import { ButtonConfig } from "./button-config";
import { getBattery, invisibleBattery, visibleBattery } from "./dom/battery-button";
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

    battery <= config.battery ? visibleBattery(batteryButton) : invisibleBattery(batteryButton);
  });
}