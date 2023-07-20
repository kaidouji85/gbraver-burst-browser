import { PlayerSelectProps } from "../props";

/**
 * アームドーザセレクタの戻るボタンを押した時の処理
 * @param props シーンプロパティ
 */
export function onArmdozerSelectorPrev(
  props: Readonly<PlayerSelectProps>
): void {
  props.prev.next();
}