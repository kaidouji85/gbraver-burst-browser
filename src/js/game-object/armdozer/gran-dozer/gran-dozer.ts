import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { createGranDozerProps } from "./props/create-gran-dozer-props";
import { GranDozerProps } from "./props/gran-dozer-props";
import { GranDozerView } from "./view/gran-dozer-view";

/** グランドーザースプライト */
export class GranDozer extends EmptyArmdozerSprite {
  /** プロパティ */
  #props: GranDozerProps;

  /**
   * コンストラクタ
   * @param view ビュー
   */
  constructor(view: GranDozerView) {
    super();
    this.#props = createGranDozerProps(view);
  }
}
