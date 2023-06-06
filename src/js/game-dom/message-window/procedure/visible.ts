import { MessageWindowProps } from "../props";
import { toRootClass } from "../dom/to-root-class";
import { ROOT_CLASS_INVISIBLE } from "../dom/class-name";

/**
 * メッセージウインドウの表示状態を設定する
 * @param props コンポネントプロパティ
 * @param isVisible trueで表示する
 */
export function visible(
  props: Readonly<MessageWindowProps>,
  isVisible: boolean
): void {
  props.root.className = isVisible
    ? toRootClass(props.position)
    : ROOT_CLASS_INVISIBLE;
}
