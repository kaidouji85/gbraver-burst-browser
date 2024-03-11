import { Resources } from "../../../../resource";
import { faceConfigs } from "../config/face-configs";
import { ROOT_CLASS_INVISIBLE } from "../dom/class-name";
import { FaceGraphicProps } from "../props";

/**
 * FaceGraphicPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createFaceGraphicProps(resources: Resources): FaceGraphicProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS_INVISIBLE;

  const images = faceConfigs.map((config) => {
    const img = document.createElement("img");
    img.className = config.invisibleClassName;
    img.src = config.src(resources);
    img.dataset.facetype = config.type;
    return img;
  });
  images.forEach((img) => {
    root.appendChild(img);
  });

  return { root, images };
}
