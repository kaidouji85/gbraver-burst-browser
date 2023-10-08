import {EpisodeElementProps} from "../props";

/**
 * チェックする
 * @param props プロパティ
 */
export function check(props: Readonly<EpisodeElementProps>): void {
  props.check.style.filter = "opacity(1)";
  props.overlay.style.filter = "opacity(1)";
}
