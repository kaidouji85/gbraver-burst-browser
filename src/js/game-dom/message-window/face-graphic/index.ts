import { Resources } from "../../../resource";
import { ROOT_CLASS, ROOT_CLASS_INVISIBLE } from "./dom/class-name";
import { faceConfigs } from "./face/face-configs";
import { FaceOrientation } from "./face/face-orientation";
import { FaceType } from "./face/face-type";

/** 顔画像 */
export class FaceGraphic {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** 顔グラフィックを集めたもの */
  #images: HTMLImageElement[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_INVISIBLE;
    this.#images = faceConfigs.map((config) => {
      const img = document.createElement("img");
      img.className = config.invisibleClassName;
      img.src = config.src(resources);
      img.dataset.facetype = config.type;
      return img;
    });
    this.#images.forEach((img) => {
      this.#root.appendChild(img);
    });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 表示、非表示を設定する
   * @param isVisible 表示フラグ、trueで表示する
   */
  visible(isVisible: boolean): void {
    this.#root.className = isVisible ? ROOT_CLASS : ROOT_CLASS_INVISIBLE;
  }

  /**
   * 顔画像を変更する
   * @param faceType 変更する顔画像
   * @param faceOrientation 顔画像の方向
   */
  face(faceType: FaceType, faceOrientation: FaceOrientation): void {
    this.#images.forEach((img) => {
      const config = faceConfigs.find((v) => v.type === img.dataset.facetype);
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
}
