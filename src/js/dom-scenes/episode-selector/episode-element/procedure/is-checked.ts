import { CHECKER_CLASS } from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * チェックされているか否かを判定する
 * @param props プロパティ
 * @return trueでチェックされている
 */
export function isChecked(props: Readonly<EpisodeElementProps>): boolean {
  return props.checker.className === CHECKER_CLASS;
}
