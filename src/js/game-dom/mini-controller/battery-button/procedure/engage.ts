import { BATTERY, BATTERY_INVISIBLE, BATTERY_FIRST, BATTERY_LAST } from "../../dom/class-name";
import { BatteryButtonConfig } from "../config";
import { BatteryButtonProps } from "../props";
import { enabled } from "./enabled";
import { disabled } from "./disabled";

/**
 * 設定を反映させる
 * @param props コンポネントプロパティ
 * @param config 設定
 */
export function engage(props: Readonly<BatteryButtonProps>, config: BatteryButtonConfig): void {
  const isVisible = props.battery <= config.maxBattery;
  const isFirst = props.battery === 0;
  const isLast = props.battery === config.maxBattery;
  if (isVisible && isFirst) {
    props.root.className = BATTERY_FIRST;
  } else if (isVisible && isLast) {
    props.root.className = BATTERY_LAST;
  } else if (isVisible) {
    props.root.className = BATTERY;
  } else {
    props.root.className = BATTERY_INVISIBLE;
  }

  const isEnabled = props.battery <= config.battery;
  if (isEnabled) {
    enabled(props);
  } else {
    disabled(props);
  }
}