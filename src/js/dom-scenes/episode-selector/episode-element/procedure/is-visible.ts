import { ROOT_CLASS } from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * エピソードが表示されているか否かを判定する
 * @param props プロパティ
 * @return trueで表示されている
 */
export function isVisible(props: Readonly<EpisodeElementProps>): boolean {
  return props.root.className === ROOT_CLASS;
}
