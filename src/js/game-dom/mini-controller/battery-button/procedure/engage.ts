import {
  BATTERY, BATTERY_DISABLED, BATTERY_ENABLED,
  BATTERY_FIRST,
  BATTERY_INVISIBLE,
  BATTERY_LAST,
} from "../../dom/class-name";
import { BatteryButtonConfig } from "../config";
import { BatteryButtonProps } from "../props";

/**
 * 設定を反映させる
 * @param props コンポネントプロパティ
 * @param config 設定
 */
export function engage(
  props: Readonly<BatteryButtonProps>,
  config: BatteryButtonConfig
): void {
  const isVisible = props.battery <= config.maxBattery;
  const isFirst = props.battery === 0;
  const isLast = props.battery === config.maxBattery;
  const isEnabled = props.battery <= config.battery;
  props.root.className = [
    BATTERY,
    isFirst ? BATTERY_FIRST : "",
    isLast ? BATTERY_LAST : "",
    isVisible ? "" : BATTERY_INVISIBLE,
    isEnabled ? BATTERY_ENABLED : BATTERY_DISABLED,
  ].join(" ");
  props.root.disabled = !isEnabled;
  props.root.innerText = isEnabled ? `${props.battery}` : "";
}
