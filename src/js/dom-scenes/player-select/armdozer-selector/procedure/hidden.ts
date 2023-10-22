import {ArmdozerSelectorProps} from "../props";
import {BLOCK_HIDDEN} from "../dom/class-name";

/**
 * 本コンポネントを非表示にする
 * @param props プロパティ
 */
export function hidden(props: Readonly<ArmdozerSelectorProps>): void {
    props.root.className = BLOCK_HIDDEN;
}