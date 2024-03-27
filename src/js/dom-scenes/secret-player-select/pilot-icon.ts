import { PilotId } from "gbraver-burst-core";

import { getPilotIconPathId } from "../../path/pilot-icon-path";
import { Resources } from "../../resource";
import { PILOT_ICON } from "./dom/class-name";

/** パイロットアイコン */
export class PilotIcon {
  /** パイロットID */
  readonly pilotId: PilotId;
  /** ルートHTML要素 */
  readonly #root: HTMLImageElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   */
  constructor(resources: Resources, pilotId: PilotId) {
    this.pilotId = pilotId;

    this.#root = document.createElement("img");
    const pathId = getPilotIconPathId(pilotId);
    this.#root.src = resources.paths.find((p) => p.id === pathId)?.path ?? "";
    this.#root.className = PILOT_ICON;
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
