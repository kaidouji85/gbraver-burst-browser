import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createZeroDefenseTutorialEvent } from "../../custom-battle-events/zero-defense-tutorial";
import { zeroDefenseTutorialNPC } from "../../npc/zero-defense-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import {EpisodeConfig} from "./episode";
import { EpisodeIDs } from "./episode-ids";

/** ゼロ防御チュートリアル */
export const zeroDefenseTutorial: EpisodeConfig = {
  id: EpisodeIDs.ZERO_DEFENSE,
  title: "ゼロ防御だと即死する",
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: zeroDefenseTutorialNPC(),
  event: createZeroDefenseTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
