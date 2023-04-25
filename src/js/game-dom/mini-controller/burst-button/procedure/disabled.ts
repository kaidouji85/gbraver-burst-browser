import { BurstButtonProps } from "../props";

/**
 * バーストボタンを操作不可能にする
 * @param props プロパティ
 */
export function disabled(props: Readonly<BurstButtonProps>): void {
  props.root.disabled = true;
  props.root.innerText = "";
}