import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";
import { createBurstTutorialEvent } from "../../custom-battle-events/burst-tutorial";
import { burstTutorialNPC } from "../../npc/burst-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { TutorialStageIDs } from "./tutorial-stage-ids";

/** バーストチュートリアル */
export const burstTutorial = {
  id: TutorialStageIDs.BURST,
  title: ["バーストで一発逆転"],
  player: {
    playerId: playerUuid(),
    armdozer: ArmDozers.find((v) => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: burstTutorialNPC(),
  event: createBurstTutorialEvent,
  bgm: SOUND_IDS.BATTLE_BGM_03,
};