import {EpisodeElementProps} from "../props";

/**
 * チェックされているか否かを判定する
 * @param props プロパティ
 * @return trueでチェックされている
 */
export function isChecked(props: Readonly<EpisodeElementProps>): boolean {
  return props.checker.checked;
}