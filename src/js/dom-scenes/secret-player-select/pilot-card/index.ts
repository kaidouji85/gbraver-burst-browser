import { PilotId, Pilots } from "gbraver-burst-core";

import { pilotSkillOverview } from "../../../game-description/pilot-skill-overview";
import { getPilotIconPathId } from "../../../path/pilot-icon-path";
import { Resources } from "../../../resource";
import { ROOT } from "./class-name";
import template from "./inner-html.hbs";
import { getPilotSkillCutinPathId } from "../../../path/pilot-skill-cutin-path";

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
    const pilotIconPath =
      resources.paths.find((p) => p.id === getPilotSkillCutinPathId(pilotId))?.path ??
      "";
    const pilot = Pilots.find((p) => p.id === pilotId) ?? Pilots[0];
    const pilotSkill = pilotSkillOverview(pilot.skill);
    this.#root.innerHTML = template({ ROOT, pilotIconPath, pilot, pilotSkill });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
