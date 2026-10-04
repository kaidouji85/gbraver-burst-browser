import { BLOCK_HIDDEN } from "../dom/class-name";
import { PilotSelectorProps } from "../props";

/**
 * 本コンポネントを非表示にする
 * @param props プロパティ
 */
export function hidden(props: PilotSelectorProps) {
  props.root.className = BLOCK_HIDDEN;
}
