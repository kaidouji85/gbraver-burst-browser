import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../path/armdozer-icon-path";
import { Resources } from "../../resource";

/** ルートHTML要素のclass属性 */
const ROOT = "armdozer-card";

/** アームドーザカード */
export class ArmdozerCard {
  /** アームドーザID */
  readonly armdozerId: ArmdozerId;
  /** ルートHTML要素 */
  readonly #root: HTMLImageElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armdozerId アームドーザID
   */
  constructor(resources: Resources, armdozerId: ArmdozerId) {
    this.armdozerId = armdozerId;

    this.#root = document.createElement("img");
    const pathId = getArmdozerIconPathId(armdozerId);
    this.#root.src = resources.paths.find((p) => p.id === pathId)?.path ?? "";
    this.#root.className = ROOT;
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
