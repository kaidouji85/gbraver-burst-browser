import { EpisodeElementProps } from "../props";
import {CHECK_CLASS, ROOT_CLASS} from "../dom/class-name";

/**
 * チェックを外す
 * @param props プロパティ
 */
export function uncheck(props: Readonly<EpisodeElementProps>): void {
  props.root.className = ROOT_CLASS;
  props.check.className = CHECK_CLASS;
}
