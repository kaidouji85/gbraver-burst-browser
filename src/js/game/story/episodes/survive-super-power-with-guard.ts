import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createSurviveSuperPowerWithGuardEvent } from "../../../custom-battle-events/survive-super-power-with-guard";
import { granDozerForSurviveSuperPowerWithGuardNPC } from "../../../npc/gran-dozer-for-survive-super-power-with-guard";
import { PathIds } from "../../../resource/path/ids";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { playerUuid } from "../../../uuid/player";
import { Episode } from "../episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
export const introduction = `後で考える`;

/** 超火力はガードで凌げ */
export const surviveSuperPowerWithGuard: Episode = {
  id: EpisodeIDs.SURVIVE_SUPER_POWER,
  type: "Episode",
  number: "5",
  title: "超火力はガードで凌げ（開発中）",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_SURVIVE_SUPER_POWER_WITH_GUARD,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.WING_DOZER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0],
  },
  npc: granDozerForSurviveSuperPowerWithGuardNPC(),
  event: () => createSurviveSuperPowerWithGuardEvent(),
  bgm: SOUND_IDS.GRAN_DOZER_STRIKE,
  isLosingEvent: false,
};
