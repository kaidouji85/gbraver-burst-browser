import {ROOT_CLASS} from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * チェックを外す
 * @param props プロパティ
 */
export function uncheck(props: Readonly<EpisodeElementProps>): void {
  props.root.className = ROOT_CLASS;
}
