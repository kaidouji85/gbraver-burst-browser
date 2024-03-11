import { FaceType } from "../face-graphic/face/face-type";
import { MessageWindowProps } from "../props";
import { getTargetFaceGraphic } from "./get-target-face-graphic";

/**
 * 顔画像を変更する
 * @param props メッセージウインドウのプロパティ
 * @param faceType 変更する顔画像
 */
export function face(
  props: Readonly<MessageWindowProps>,
  faceType: FaceType,
): void {
  const target = getTargetFaceGraphic(props);
  target.face(faceType, props.faceOrientation);
}
