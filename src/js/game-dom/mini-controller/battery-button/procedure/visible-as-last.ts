import { BATTERY_LAST } from "../../dom/class-name";
import { BatteryButtonProps } from "../props";

/**
 * バッテリーボタンを末尾要素として表示する
 * @param props コンポネントプロパティ
 */
export function visibleAsLast(props: Readonly<BatteryButtonProps>): void {
  props.root.className = BATTERY_LAST;
}