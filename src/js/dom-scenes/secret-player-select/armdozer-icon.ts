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
    this.#root.className = ARMDOZER_ICON;
    this.#root.src =
      resources.paths.find((p) => p.id === getArmdozerIconPathId(armdozerId))
        ?.path ?? "";
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
