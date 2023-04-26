import { PilotButtonProps } from "../props";

/**
 * パイロットボタンを操作可能にする
 * @param props コンポネントプロパティ
 */
export function enabled(props: Readonly<PilotButtonProps>): void {
  props.root.disabled = false;
  props.root.innerText = "パイロット(p)";
}