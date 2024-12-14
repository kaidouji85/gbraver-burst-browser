import { EmptyArmdozerSprite } from "../empty-armdozer-sprite";
import { createGranDozerProps } from "./props/create-gran-dozer-props";
import { GranDozerProps } from "./props/gran-dozer-props";

/** グランドーザースプライト */
export class GranDozer extends EmptyArmdozerSprite {
  /** プロパティ */
  #props: GranDozerProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#props = createGranDozerProps();
  }
}
