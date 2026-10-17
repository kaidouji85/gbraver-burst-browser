import { createEasterEggProps } from "./procedure/create-easter-egg-props";
import { show } from "./procedure/show";
import { EasterEggProps } from "./props";

/** イースターエッグ */
export class EasterEgg {
  /** プロパティ */
  #props: EasterEggProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createEasterEggProps();
  }

  /**
   * イースターエッグを表示する
   * @returns アニメーションが終了したら発火するPromise
   */
  async show(): Promise<void> {
    await show(this.#props);
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
