import { FaceGraphic } from "../face-graphic";
import { MessageWindowProps } from "../props";

/**
 * 表示位置に応じた顔画像を取得する
 * @param props メッセージウインドウのプロパティ
 * @returns 取得結果
 */
export function getTargetFaceGraphic(
  props: Readonly<MessageWindowProps>,
): FaceGraphic {
  return props.facePosition === "Left"
    ? props.leftFaceGraphic
    : props.rightFaceGraphic;
}
