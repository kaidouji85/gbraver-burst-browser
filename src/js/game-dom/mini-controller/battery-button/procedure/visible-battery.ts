import { BATTERY } from "../../dom/class-name";
import { BatteryButtonProps } from "../props";

/**
 * バッテリーボタンを表示する
 * @param props コンポネントプロパティ
 */
export function visibleBattery(props: Readonly<BatteryButtonProps>): void {
  props.root.className = BATTERY;
}