import { EpisodeElementProps } from "../props";
import {CHECK} from "../dom/class-name";

/**
 * チェックを外す
 * @param props プロパティ
 */
export function uncheck(props: Readonly<EpisodeElementProps>): void {
  props.check.className = CHECK;
}
