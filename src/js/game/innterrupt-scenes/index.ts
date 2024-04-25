import type { Resources } from "../../resource";
import { PlayInLandscape } from "./play-in-landscape/play-in-landscape";

/** 割り込みで表示されるシーンをあつめたもの */
export class InterruptScenes {
  #root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
  }

  /**
   * 割り込みシーンをルート要素に関連づける
   *
   * @param resources リソース管理オブジェクト
   */
  bind(resources: Resources): void {
    const playInLandscape = new PlayInLandscape(resources);
    this.#root.appendChild(playInLandscape.getRootHTMLElement());
  }

  /**
   * 本クラスに含まれるルートHTML要素を返す
   *
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
