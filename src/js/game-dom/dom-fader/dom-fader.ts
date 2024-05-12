import { waitFinishAnimation } from "../../dom/wait-finish-animation";

/**
 * HTML要素で作られたフェーダ
 */
export class DOMFader {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement("div");
    this._root.className = "dom-fader";
    this._root.style.display = "none";
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * フェーダーを即座に消す
   */
  hidden(): void {
    this._root.style.display = "none";
  }

  /**
   * フェードイン
   *
   * @returns アニメーション
   */
  async fadeIn(): Promise<void> {
    this._root.style.display = "block";
    const animation = this._root.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease",
      },
    );
    await waitFinishAnimation(animation);
    this._root.style.display = "none";
  }

  /**
   * フェードアウト
   *
   * @returns アニメーション
   */
  async fadeOut(): Promise<void> {
    this._root.style.display = "block";
    const animation = this._root.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "ease",
      },
    );
    await waitFinishAnimation(animation);
  }
}
