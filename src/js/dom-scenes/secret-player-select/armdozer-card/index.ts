import { ArmdozerId, Armdozers } from "gbraver-burst-core";

import { burstOverview } from "../../../game-description/burst-overview";
import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./inner-html.hbs";
import {getArmdozerBustShotPathId} from "../../../path/armdozer-bust-shot-path";

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
    const armdozerIconPath =
      resources.paths.find((p) => p.id === getArmdozerBustShotPathId(armdozerId))
        ?.path ?? "";
    const armdozer = Armdozers.find((a) => a.id === armdozerId) ?? Armdozers[0];
    const burst = burstOverview(armdozer.burst);
    this.#root.innerHTML = template({
      ROOT,
      batteryIconPath,
      armdozerIconPath,
      armdozer,
      burst,
    });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
