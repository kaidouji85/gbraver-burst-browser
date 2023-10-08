import { EpisodeElementProps } from "../props";
import {ROOT_CLASS} from "../dom/class-name";

/**
 * チェックを外す
 * @param props プロパティ
 */
export function uncheck(props: Readonly<EpisodeElementProps>): void {
  props.root.className = ROOT_CLASS;
}
