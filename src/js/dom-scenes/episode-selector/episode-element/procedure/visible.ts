import { ROOT_CLASS, ROOT_CLASS_INVISIBLE } from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * 表示、非表示の設定
 * @param props プロパティ
 * @param isVisible trueで表示する
 */
export function visible(
  props: Readonly<EpisodeElementProps>,
  isVisible: boolean,
): void {
  props.root.className = isVisible ? ROOT_CLASS : ROOT_CLASS_INVISIBLE;
}
