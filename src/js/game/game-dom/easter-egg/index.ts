import { waitFinishAnimation } from "../../../dom/wait-finish-animation";

/** イースターエッグ */
export class EasterEgg {
  /** ルートHTML要素 */
  #root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
    this.#root.className = "easter-egg";

    const content = document.createElement("div");
    content.className = "easter-egg__content";
    content.textContent = "🎉イースターエッグ";
    this.#root.appendChild(content);
  }

  /**
   * イースターエッグを表示する
   * @returns アニメーションが終了したら発火するPromise
   */
  async show(): Promise<void> {
    const animation = this.#root.animate(
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
    return this.#root;
  }
}
