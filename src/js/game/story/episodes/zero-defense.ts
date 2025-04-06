import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createZeroDefenseTutorialEvent } from "../../../custom-battle-events/zero-defense-tutorial";
import { zeroDefenseTutorialNPC } from "../../../npc/zero-defense-tutorial";
import { PathIds } from "../../../resource/path/ids";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { playerUuid } from "../../../uuid/player";
import { Episode } from "../episode";
import { EpisodeIDs } from "./episode-ids";

/** イントロダクション */
const introduction = `今日は機動倶楽部の新人戦、シンヤは同学年のガイと対峙することになるが序盤からリードをとられてしまい……。`;

/** ゼロ防御チュートリアル */
export const zeroDefenseTutorial: Episode = {
  id: EpisodeIDs.ZERO_DEFENSE,
  type: "Episode",
  number: "2",
  title: "ゼロ防御だと即死する",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_ZERO_DEFENSE,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: zeroDefenseTutorialNPC(),
  event: createZeroDefenseTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_01,
  isLosingEvent: false,
};
