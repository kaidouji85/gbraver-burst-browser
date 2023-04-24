import { BatteryButtonProps } from "../props";

/**
 * バッテリーボタンを操作不可能にする
 * @param props コンポネントプロパティ
 */
export function disabledBattery(props: Readonly<BatteryButtonProps>): void {
  props.root.disabled = true;
  props.root.innerText = "";
}