import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { createEasterEggProps } from "./procedure/create-easter-egg-props";
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
    const animation = this.#props.root.animate(
      [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
      { duration: 400, fill: "forwards", easing: "ease" },
    );
    await waitFinishAnimation(animation);
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
