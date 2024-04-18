import { createPredicatedDamageProps } from "./procedure/create-predicated-damage-props";
import { PredicatedDamageProps } from "./props";

/** ダメージ予想 */
export class PredicatedDamage {
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
}
