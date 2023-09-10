import { ArmdozerIds, Armdozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createPilotSkillTutorial01Event } from "../../custom-battle-events/pilot-skill-tutorial-01";
import { pilotSkillTutorialNPC } from "../../npc/pilot-skill-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { TutorialStage } from "./tutorial-stage";
import { TutorialStageIDs } from "./tutorial-stage-ids";

/** パイロットスキルチュートリアル（前半） */
export const pilotSkillTutorial01: TutorialStage = {
  id: TutorialStageIDs.Pilot01,
  type: "Advanced",
  title: ["パイロット次第では詰み（負けイベント）"],
  player: {
    playerId: playerUuid(),
    armdozer:
      Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0],
  },
  npc: pilotSkillTutorialNPC(),
  event: createPilotSkillTutorial01Event,
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
