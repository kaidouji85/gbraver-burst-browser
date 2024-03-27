import { PilotId } from "gbraver-burst-core";

import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { getPilotSkillCutinPathId } from "../../../path/pilot-skill-cutin-path";
import { Resources } from "../../../resource";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { getPilotBustShotClassName } from "./class-name";

/** パイロットバストショット */
export class PilotBustShot {
  /** 画像要素 */
  #image: HTMLImageElement;
  /** 画像が読みこみ完了したら発火するPromise */
  #isLoaded: Promise<void>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   */
  constructor(resources: Resources, pilotId: PilotId) {
    this.#image = document.createElement("img");
    this.#image.src = resources.paths.find(p => p.id === getPilotSkillCutinPathId(pilotId))?.path ?? "";
    this.#image.className = getPilotBustShotClassName(pilotId);
    this.#isLoaded = waitElementLoaded(this.#image);
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#image;
  }

  /**
   * 読み込みが完了するまで待つ
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
   * 入場
   * @return アニメーション
   */
  enter(): Promise<void> {
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

  /**
   * 退場
   * @return アニメーション
   */
  exit(): Promise<void> {
    const animation = this.#image.animate(
      [
        {
          transform: "translateX(0)",
        },
        {
          transform: "translateX(15em)",
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
