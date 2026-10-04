import { BLOCK } from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * エピソードが表示されているか否かを判定する
 * @param props プロパティ
 * @returns trueで表示されている
 */
export function isVisible(props: Readonly<EpisodeElementProps>): boolean {
  return props.root.className === BLOCK;
}
