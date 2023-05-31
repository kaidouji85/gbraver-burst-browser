import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";

import { createPilotSkillTutorial02Event } from "../../custom-battle-events/pilot-skill-tutorial-02";
import { pilotSkillTutorialNPC } from "../../npc/pilot-skill-tutorial";
import { SOUND_IDS } from "../../resource/sound";
import { playerUuid } from "../../uuid/player";
import { TutorialStage } from "./tutorial-stage";
import { TutorialStageIDs } from "./tutorial-stage-ids";

/** パイロットスキルチュートリアル（後半） */
export const pilotSkillTutorial02: TutorialStage = {
  id: TutorialStageIDs.Pilot01,
  title: ["パイロットスキルで意表を突け（後半）"],
  player: {
    playerId: playerUuid(),
    armdozer:
      ArmDozers.find((v) => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0],
    pilot: Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0],
  },
  npc: pilotSkillTutorialNPC(),
  event: createPilotSkillTutorial02Event,
  bgm: SOUND_IDS.BATTLE_BGM_01,
};
