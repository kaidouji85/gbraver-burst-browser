import { PlayerState } from "gbraver-burst-core";

import { burstDetail } from "../../../game-description/burst-detail";
import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";
import { pilotSkillDetail } from "../../../game-description/pilot-skill-detail";

/** オプション */
export type RootInnerHTMLOptions = ResourcesContainer & {
  /** ダイアログを表示するステート */
  state: PlayerState;
};

/**
 * ルート要素のinnerHTMLを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function rootInnerHTML(options: RootInnerHTMLOptions): string {
  const { resources } = options;
  const { armdozer, pilot } = options.state;
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  const armdozerIconPathId = getArmdozerIconPathId(armdozer.id);
  const armdozerIconPath =
    resources.paths.find((p) => p.id === armdozerIconPathId)?.path ?? "";
  const batteryIconPath =
    resources.paths.find((p) => p.id === PathIds.BATTERY_ICON)?.path ?? "";
  const burstDescription = burstDetail(armdozer.burst).join("");
  const pilotSkillDescription = pilotSkillDetail(pilot.skill).join("");
  return template({
    ROOT,

    closerPath,
    armdozerIconPath,
    batteryIconPath,

    armdozer,
    burstDescription,
    pilot,
    pilotSkillDescription,
  });
}
