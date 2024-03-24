import { faceConfigs } from "../config/face-configs";
import { FaceOrientation } from "../config/face-orientation";
import { FaceType } from "../config/face-type";
import { FaceGraphicProps } from "../props";

/**
 * 画像要素を更新する
 * @param image 更新する画像要素
 * @param faceType 顔画像タイプ
 * @param faceOrientation 顔画像の方向
 */
function updateImages(
  image: HTMLImageElement,
  faceType: FaceType,
  faceOrientation: FaceOrientation,
): void {
  const config = faceConfigs.find((c) => c.type === image.dataset.facetype);
  if (!config) {
    return;
  }

  if (faceType !== image.dataset.facetype) {
    image.className = config.invisibleClassName;
    return;
  }

  image.className =
    faceOrientation === "Right" ? config.rightwardClassName : config.className;
}

/**
 * 顔画像を変更する
 * @param faceType 変更する顔画像
 * @param faceOrientation 顔画像の方向
 */
export function face(
  props: FaceGraphicProps,
  faceType: FaceType,
  faceOrientation: FaceOrientation,
): void {
  props.images.forEach((image) => {
    updateImages(image, faceType, faceOrientation);
  });
}
