import { BATTERY_INVISIBLE } from "../../dom/class-name";
import { BatteryButtonProps } from "../props";

/**
 * バッテリーボタンを非表示にする
 * @param props コンポネントプロパティ
 */
export function invisible(props: Readonly<BatteryButtonProps>): void {
  props.root.className = BATTERY_INVISIBLE;
}