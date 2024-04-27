import { PilotId } from "gbraver-burst-core";

import { getPilotIconPathId } from "../../../path/pilot-icon-path";
import { Resources } from "../../../resource";
import { PILOT_ICON } from "./class-name";

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
    this.#root.className = PILOT_ICON;
    this.#root.src =
      resources.paths.find((p) => p.id === getPilotIconPathId(pilotId))?.path ??
      "";
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
