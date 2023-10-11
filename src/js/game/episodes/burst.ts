import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBurstTutorialEvent } from "../../custom-battle-events/burst-tutorial";
import { burstTutorialNPC } from "../../npc/burst-tutorial";
import { PathIds } from "../../resource/path/ids";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { EpisodeConfig } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** 導入 */
const introduction = `デビュー戦を見事勝利で飾ったシンヤ、そんなシンヤを見て台東高校のライト先輩は何かを企んでいるようだが……。`;

/** バーストチュートリアル */
export const burstTutorial: EpisodeConfig = {
  id: EpisodeIDs.BURST,
  title: "バーストで一発逆転",
  introduction,
  imageCutPathId: PathIds.IMAGE_CUT_BURST, // TODO 正しい画像を指定する
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: burstTutorialNPC(),
  event: createBurstTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_03,
};
