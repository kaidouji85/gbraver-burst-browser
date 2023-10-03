import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createBurstTutorialEvent } from "../../custom-battle-events/burst-tutorial";
import { burstTutorialNPC } from "../../npc/burst-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { EpisodeConfig } from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** バーストチュートリアル */
export const burstTutorial: EpisodeConfig = {
  id: EpisodeIDs.BURST,
  title: "バーストで一発逆転",
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
