import { faceConfigs } from "../face/face-configs";
import { FaceOrientation } from "../face/face-orientation";
import { FaceType } from "../face/face-type";
import { FaceGraphicProps } from "../props";

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
  props.images.forEach((img) => {
    const config = faceConfigs.find(
      (config) => config.type === img.dataset.facetype,
    );
    if (!config) {
      return;
    }

    if (faceType !== img.dataset.facetype) {
      img.className = config.invisibleClassName;
      return;
    }

    img.className =
      faceOrientation === "Right"
        ? config.rightwardClassName
        : config.className;
  });
}
