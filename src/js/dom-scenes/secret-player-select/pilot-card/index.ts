import { PilotId } from "gbraver-burst-core";

import { Resources } from "../../../resource";
import { ROOT } from "./class-name";
import template from "./inner-html.hbs";

/** パイロットカード */
export class PilotCard {
  /** パイロットID */
  pilotId: PilotId;
  /** ルートHTML要素 */
  #root: HTMLButtonElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   */
  constructor(resources: Resources, pilotId: PilotId) {
    this.pilotId = pilotId;

    this.#root = document.createElement("button");
    this.#root.className = ROOT;
    this.#root.innerHTML = template({ ROOT });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
