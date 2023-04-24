import { BATTERY_FIRST } from "../../dom/class-name";
import { BatteryButtonProps } from "../props";

/**
 * バッテリーボタンを先頭要素として表示する
 * @param props コンポネントプロパティ
 */
export function visibleBatteryAsFirst(props: Readonly<BatteryButtonProps>): void {
  props.root.className = BATTERY_FIRST;
}