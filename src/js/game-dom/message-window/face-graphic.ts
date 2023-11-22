import { Resources } from "../../resource";
import { PathIds } from "../../resource/path/ids";

/** ルートHTML要素class属性 */
const ROOT_CLASS = "face-graphic";

/** 顔画像非表示時のルートHTML要素class属性 */
const ROOT_CLASS_INVISIBLE = `${ROOT_CLASS}--invisible`;

/** 顔画像タイプ */
export type FaceType = "Shinya" | "Gai" | "Raito" | "Tsubasa" | "Yuuya";

/** 顔画像の向き */
export type FaceOrientation = "Left" | "Right";

/** 顔画像設定 */
type Config = {
  /** 顔画像タイプ */
  type: FaceType;
  /** class属性 */
  className: string;
  /** 右向き時のclass属性 */
  rightwardClassName: string;
  /** 非表示時のclass属性 */
  invisibleClassName: string;

  /**
   * 顔画像パス
   * @param resources リソース管理オブジェクト
   * @return 顔画像パス
   */
  src: (resources: Resources) => string;
};

/** 顔画像設定をあつめたもの */
const configs: Config[] = [
  {
    type: "Shinya",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.SHINYA_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__shinya`,
    rightwardClassName: `${ROOT_CLASS}__shinya--right`,
    invisibleClassName: `${ROOT_CLASS}__shinya--invisible`,
  },
  {
    type: "Gai",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.GAI_SKILL_CUTIN)?.path ?? "",
    className: `${ROOT_CLASS}__gai`,
    rightwardClassName: `${ROOT_CLASS}__gai--right`,
    invisibleClassName: `${ROOT_CLASS}__gai--invisible`,
  },
  {
    type: "Raito",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.RAITO_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__raito`,
    rightwardClassName: `${ROOT_CLASS}__raito--right`,
    invisibleClassName: `${ROOT_CLASS}__raito--invisible`,
  },
  {
    type: "Tsubasa",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.TSUBASA_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__tsubasa`,
    rightwardClassName: `${ROOT_CLASS}__tsubasa--right`,
    invisibleClassName: `${ROOT_CLASS}__tsubasa--invisible`,
  },
  {
    type: "Yuuya",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.YUUYA_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__yuuya`,
    rightwardClassName: `${ROOT_CLASS}__yuuya--right`,
    invisibleClassName: `${ROOT_CLASS}__yuuya--invisible`,
  },
];

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
    this.#images = configs.map((config) => {
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
      const config = configs.find((v) => v.type === img.dataset.facetype);
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
