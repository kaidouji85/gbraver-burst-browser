import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack4Defense1ShinBraverStage } from "../stages/attack4-defense1-shin-braver-stage";
import { BurstAttack5NeoLandozderStage } from "../stages/burst-attack5-neo-landozder-stage";
import { PrioritizeDefenseWingDozerStage } from "../stages/prioritize-defense-wing-dozer-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** NPCバトル ライトニングドーザ Normal */
export const LightningDozerNormal: NPCBattleCourse = {
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  difficulty: "Normal",
  stages: [
    { ...Attack4Defense1ShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...PrioritizeDefenseWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...BurstAttack5NeoLandozderStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
