import { EpisodeElementProps } from "../props";
import {CHECK__CHECKED} from "../dom/class-name";

/**
 * チェックする
 * @param props プロパティ
 */
export function check(props: Readonly<EpisodeElementProps>): void {
  props.check.className = CHECK__CHECKED;
}
