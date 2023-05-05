import {
  BATTERY,
  BATTERY_FIRST,
  BATTERY_INVISIBLE,
  BATTERY_LAST,
} from "../../dom/class-name";
import { BatteryButtonConfig } from "../config";
import { BatteryButtonProps } from "../props";
import { disabled } from "./disabled";
import { enabled } from "./enabled";

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

  props.root.className = [
    BATTERY,
    isFirst ? BATTERY_FIRST : "",
    isLast ? BATTERY_LAST : "",
    isVisible ? "" : BATTERY_INVISIBLE,
  ].join(" ");

  const isEnabled = props.battery <= config.battery;
  if (isEnabled) {
    enabled(props);
  } else {
    disabled(props);
  }
}
