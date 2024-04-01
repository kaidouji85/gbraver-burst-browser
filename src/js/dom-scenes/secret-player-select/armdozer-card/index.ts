import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./inner-html.hbs";

/** アームドーザカード */
export class ArmdozerCard {
  /** アームドーザID */
  readonly armdozerId: ArmdozerId;
  /** ルートHTML要素 */
  readonly #root: HTMLButtonElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armdozerId アームドーザID
   */
  constructor(resources: Resources, armdozerId: ArmdozerId) {
    this.armdozerId = armdozerId;

    this.#root = document.createElement("button");
    this.#root.className = ROOT;
    const batteryIconPath =
      resources.paths.find((p) => p.id === PathIds.BATTERY_ICON)?.path ?? "";
    const iconPath =
      resources.paths.find(
        (p) => p.id === getArmdozerIconPathId(armdozerId),
      )?.path ?? "";
    this.#root.innerHTML = template({ ROOT, batteryIconPath, iconPath });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
