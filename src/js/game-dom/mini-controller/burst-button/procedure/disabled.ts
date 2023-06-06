import { BurstButtonProps } from "../props";

/**
 * バーストボタンを無効化する
 * @param props コンポネントプロパティ
 */
export function disabled(props: Readonly<BurstButtonProps>): void {
  props.root.disabled = true;
}
