import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack4Defense1LightningDozerStage } from "../stages/attack4-defense1-lightning-dozer-stage";
import { BurstAttack5NeoLandozderStage } from "../stages/burst-attack5-neo-landozder-stage";
import { PrioritizeDefenseWingDozerStage } from "../stages/prioritize-defense-wing-dozer-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** NPCバトル シンブレイバー Normal */
export const ShinBraverNormal: NPCBattleCourse = {
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  difficulty: "Normal",
  stages: [
    { ...Attack4Defense1LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...PrioritizeDefenseWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...BurstAttack5NeoLandozderStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
