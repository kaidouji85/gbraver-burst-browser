import { BatteryButtonProps } from "../props";

/**
 * バッテリーボタンを操作可能にする
 * @param props コンポネントプロパティ
 */
export function enabled(props: Readonly<BatteryButtonProps>): void {
  props.root.disabled = false;
  props.root.innerText = `${props.battery}`;
}
