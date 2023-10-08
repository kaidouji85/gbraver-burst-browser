import { EpisodeElementProps } from "../props";
import {CHECK_CLASS__CHECKED, ROOT_CLASS__CHECKED} from "../dom/class-name";

/**
 * チェックする
 * @param props プロパティ
 */
export function check(props: Readonly<EpisodeElementProps>): void {
  props.root.className = ROOT_CLASS__CHECKED;
  props.check.className = CHECK_CLASS__CHECKED;
}
