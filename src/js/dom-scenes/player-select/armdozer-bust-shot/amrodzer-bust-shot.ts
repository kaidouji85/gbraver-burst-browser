import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";

/**
 * @deprecated
 * cssクラス名のプレフィックス
 */
export const CLASS_NAME_PREFIX = "armdozer-bust-shot";

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShot {
  #image: HTMLImageElement;
  #isLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param path 画像パス
   * @param className cssクラス名
   */
  constructor(path: string, className: string) {
    this.#image = document.createElement("img");
    this.#image.src = path;
    this.#image.className = className;
    this.#isLoaded = waitElementLoaded(this.#image);
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#image;
  }

  /**
   * 読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this.#isLoaded;
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this.#image.style.opacity = "0";
  }

  /**
   * 表示する
   */
  show(): void {
    this.#image.style.opacity = "1";
  }

  /**
   * アニメーションさせる
   *
   * @return アニメーション
   */
  move(): Promise<void> {
    const animation = this.#image.animate(
      [
        {
          transform: "translateX(5em)",
        },
        {
          transform: "translateX(0)",
        },
      ],
      {
        duration: 200,
        fill: "forwards",
        easing: "ease",
      },
    );
    return waitFinishAnimation(animation);
  }
}
