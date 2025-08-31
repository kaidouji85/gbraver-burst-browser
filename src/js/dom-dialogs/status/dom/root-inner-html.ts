import { PlayerState } from "gbraver-burst-core";

import { burstDetail } from "../../../game-description/burst-detail";
import { pilotSkillDetail } from "../../../game-description/pilot-skill-detail";
import { getArmdozerStandPathId } from "../../../path/armdozer-stand-path";
import { getPilotIconPathId } from "../../../path/pilot-icon-path";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { AVAILABLE_BOX, DISABLED_BOX, ROOT } from "./class-name";
import template from "./root-inner-html.hbs";
import { getPilotSkillCutinPathId } from "../../../path/pilot-skill-cutin-path";

const AVAILABLE = "発動可";

const DISABLED = "発動済";

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
  const armdozerIconPathId = getArmdozerStandPathId(armdozer.id);
  const armdozerIconPath =
    resources.paths.find((p) => p.id === armdozerIconPathId)?.path ?? "";
  const pilotIconPathId = getPilotSkillCutinPathId(pilot.id);
  const pilotIconPath =
    resources.paths.find((p) => p.id === pilotIconPathId)?.path ?? "";
  const batteryIconPath =
    resources.paths.find((p) => p.id === PathIds.BATTERY_ICON)?.path ?? "";

  const burstAvailableClassName = armdozer.enableBurst
    ? AVAILABLE_BOX
    : DISABLED_BOX;
  const burstAvailableCaption = armdozer.enableBurst ? AVAILABLE : DISABLED;
  const pilotAvailableClassName = pilot.enableSkill
    ? AVAILABLE_BOX
    : DISABLED_BOX;
  const pilotAvailableCaption = pilot.enableSkill ? AVAILABLE : DISABLED;

  const burstDescription = burstDetail(armdozer.burst).join("");
  const pilotSkillDescription = pilotSkillDetail(pilot.skill).join("");
  return template({
    ROOT,

    closerPath,
    armdozerIconPath,
    pilotIconPath,
    batteryIconPath,

    burstAvailableClassName,
    burstAvailableCaption,
    pilotAvailableClassName,
    pilotAvailableCaption,

    armdozer,
    burstDescription,
    pilot,
    pilotSkillDescription,
  });
}
