import { ROOT_CLASS_HIDDEN } from "../dom/class-name";
import { EasterEggProps } from "../props";

/**
 * イースターエッグを非表示にする
 * @param props イースターエッグのプロパティ
 */
export const hidden = (props: Readonly<EasterEggProps>): void => {
  props.root.className = ROOT_CLASS_HIDDEN;
};
