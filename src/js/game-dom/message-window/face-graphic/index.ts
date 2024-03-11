import { Resources } from "../../../resource";
import { FaceOrientation } from "./face/face-orientation";
import { FaceType } from "./face/face-type";
import { createFaceGraphicProps } from "./procedures/create-face-graphic-props";
import { face } from "./procedures/face";
import { visible } from "./procedures/visible";
import { FaceGraphicProps } from "./props";

/** 顔画像 */
export class FaceGraphic {
  /** コンポネントのプロパティ */
  #props: FaceGraphicProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createFaceGraphicProps(resources);
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 表示、非表示を設定する
   * @param isVisible 表示フラグ、trueで表示する
   */
  visible(isVisible: boolean): void {
    visible(this.#props, isVisible);
  }

  /**
   * 顔画像を変更する
   * @param faceType 変更する顔画像
   * @param faceOrientation 顔画像の方向
   */
  face(faceType: FaceType, faceOrientation: FaceOrientation): void {
    face(this.#props, faceType, faceOrientation);
  }
}
