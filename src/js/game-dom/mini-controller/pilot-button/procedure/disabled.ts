import { PilotButtonProps } from "../props";

/**
 * パイロットボタンを操作不可能にする
 * @param props コンポネントプロパティ
 */
export function disabled(props: Readonly<PilotButtonProps>): void {
  props.root.disabled = true;
  props.root.innerText = "";
}
