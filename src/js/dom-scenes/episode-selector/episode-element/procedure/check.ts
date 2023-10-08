import {ROOT_CLASS__CHECKED} from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * チェックする
 * @param props プロパティ
 */
export function check(props: Readonly<EpisodeElementProps>): void {
  props.root.className = ROOT_CLASS__CHECKED;
}
