import { DOMCoordinate } from "../../tracking/coordinate";
import { DOMTracking } from "../../tracking/dom-tracking";
import { createPredicatedDamageProps } from "./procedure/create-predicated-damage-props";
import { tracking } from "./procedure/tracking";
import { PredicatedDamageProps } from "./props";

/** ダメージ予想 */
export class PredicatedDamage implements DOMTracking {
  /** プロパティ */
  #props: PredicatedDamageProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPredicatedDamageProps();
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /** @override */
  tracking(coordinate: DOMCoordinate): void {
    tracking(this.#props, coordinate);
  }
}
