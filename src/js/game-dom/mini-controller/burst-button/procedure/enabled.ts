import { BurstButtonProps } from "../props";

/**
 * バーストボタンを操作可能にする
 * @param props プロパティ
 */
export function enabled(props: Readonly<BurstButtonProps>): void {
  props.root.disabled = false;
  props.root.innerText = "バースト(b)";
}