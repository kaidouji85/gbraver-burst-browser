import {EpisodeElementProps} from "../props";

/**
 * チェックを外す
 * @param props プロパティ
 */
export function uncheck(props: Readonly<EpisodeElementProps>): void {
  props.check.style.filter = "opacity(0)";
  props.overlay.style.filter = "opacity(0)";
}
