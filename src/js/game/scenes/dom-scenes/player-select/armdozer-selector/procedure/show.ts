import { BLOCK } from "../dom/class-name";
import { ArmdozerSelectorProps } from "../props";

/**
 * 本コンポネントを表示する
 * @param props プロパティ
 */
export function show(props: Readonly<ArmdozerSelectorProps>): void {
  props.root.className = BLOCK;
}
