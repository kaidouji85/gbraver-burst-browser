import { ROOT_CLASS, ROOT_CLASS_INVISIBLE } from "../dom/class-name";
import { FaceGraphicProps } from "../props";

/**
 * 表示、非表示を設定する
 * @param isVisible 表示フラグ、trueで表示する
 */
export function visible(props: FaceGraphicProps, isVisible: boolean): void {
  props.root.className = isVisible ? ROOT_CLASS : ROOT_CLASS_INVISIBLE;
}
