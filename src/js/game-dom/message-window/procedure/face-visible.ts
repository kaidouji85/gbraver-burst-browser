import { MessageWindowProps } from "../props";
import { getTargetFaceGraphic } from "./get-target-face-graphic";

/**
 * 顔画像の表示、非表示設定
 * @param props メッセージウインドウプロパティ
 * @param isVisible 顔画像表示フラグ、trueで表示する
 */
export function faceVisible(
  props: Readonly<MessageWindowProps>,
  isVisible: boolean
): void {
  const target = getTargetFaceGraphic(props);
  target.visible(isVisible);
}
