import { EpisodeElementProps } from "../props";

  /**
   * チェック状態を変更する
   * @param props 画面プロパティ
   * @param isChecked trueでチェックする
   */
export function checked(
  props: Readonly<EpisodeElementProps>,
  isChecked: boolean
): void {
  props.checker.checked = isChecked;
}
