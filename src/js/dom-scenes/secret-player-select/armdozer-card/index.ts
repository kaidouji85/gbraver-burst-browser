import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerBustShotPathId } from "../../../path/armdozer-bust-shot-path";
import { Resources } from "../../../resource";
import { ROOT } from "./class-name";
import template from "./inner-html.hbs";
import { PathIds } from "../../../resource/path/ids";

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
    const bustShotPath =
      resources.paths.find(
        (p) => p.id === getArmdozerBustShotPathId(armdozerId),
      )?.path ?? "";
    this.#root.innerHTML = template({ ROOT, batteryIconPath, bustShotPath });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
