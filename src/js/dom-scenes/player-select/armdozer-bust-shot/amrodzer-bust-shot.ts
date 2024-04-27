import { ArmdozerId } from "gbraver-burst-core";

import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { getArmdozerBustShotPathId } from "../../../path/armdozer-bust-shot-path";
import { Resources } from "../../../resource";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { getArmdozerBustShotClassName } from "./class-name";

/** アームドーザバストショット */
export class ArmdozerBustShot {
  /** アームドーザID */
  readonly armdozerId: ArmdozerId;
  /** 画像要素 */
  readonly #image: HTMLImageElement;
  /** 画像の読みこみが完了したら発火するPromise */
  readonly #isLoaded: Promise<void>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armdozerId アームドーザID
   */
  constructor(resources: Resources, armdozerId: ArmdozerId) {
    this.armdozerId = armdozerId;

    this.#image = document.createElement("img");
    this.#image.src =
      resources.paths.find(
        (p) => p.id === getArmdozerBustShotPathId(armdozerId),
      )?.path ?? "";
    this.#image.className = getArmdozerBustShotClassName(armdozerId);

    this.#isLoaded = waitElementLoaded(this.#image);
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#image;
  }

  /**
   * 読み込みが完了するまで待つ
   * @returns 待機結果
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
   * 移動する
   * @returns アニメーション
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
