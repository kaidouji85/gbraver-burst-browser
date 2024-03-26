import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../path/armdozer-icon-path";
import { Resources } from "../../resource";
import { ARMDOZER_ICON } from "./dom/class-name";

/** アームドーザアイコン */
export class ArmdozerIcon {
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
    this.#root.className = ARMDOZER_ICON;
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
