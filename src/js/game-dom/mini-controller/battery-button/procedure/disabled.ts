import {BatteryButtonProps} from "../props";

/**
 * バッテリーボタンを無効化する
 * @param props コンポネントプロパティ
 */
export function disabled(
  props: Readonly<BatteryButtonProps>
): void {
  props.root.disabled = true;
}
