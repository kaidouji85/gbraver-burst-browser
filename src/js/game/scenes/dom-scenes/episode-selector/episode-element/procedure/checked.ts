import { CHECKER, CHECKER_INVISIBLE } from "../dom/class-name";
import { EpisodeElementProps } from "../props";

/**
 * チェック状態を変更する
 * @param props 画面プロパティ
 * @param isChecked trueでチェックする
 */
export function checked(
  props: Readonly<EpisodeElementProps>,
  isChecked: boolean,
): void {
  props.checker.className = isChecked ? CHECKER : CHECKER_INVISIBLE;
}
