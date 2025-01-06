import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBurstTutorialEvent } from "../../custom-battle-events/burst-tutorial";
import { burstTutorialNPC } from "../../npc/burst-tutorial";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound/ids";
import { playerUuid } from "../../uuid/player";
import { Episode } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `デビュー戦を見事勝利で飾ったシンヤ、そんなシンヤを見て台東高校のライト先輩は何かを企んでいるようだが……。`;

/** バーストチュートリアル */
export const burstTutorial: Episode = {
  id: EpisodeIDs.BURST,
  type: "Episode",
  number: "3",
  title: "バーストで一発逆転",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_BURST,
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: burstTutorialNPC(),
  event: createBurstTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_03,
  isLosingEvent: false,
};
