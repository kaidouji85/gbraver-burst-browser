import {PilotButtonProps} from "../props";

/**
 * パイロットボタンを無効化する
 * @param props コンポネントプロパティ
 */
export function disabled(
  props: Readonly<PilotButtonProps>
): void {
  props.root.disabled = true;
}