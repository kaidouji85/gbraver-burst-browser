import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack4Defense1LightningDozerStage } from "../stages/attack4-defense1-lightning-dozer-stage";
import { BurstAttack5NeoLandozderStage } from "../stages/burst-attack5-neo-landozder-stage";
import { PrioritizeDefenseShinBraverStage } from "../stages/prioritize-defense-shin-braver-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** ウィングドーザー NPCバトル Normal */
export const WingDozerNormal: NPCBattleCourse = {
  armdozerId: ArmdozerIds.WING_DOZER,
  difficulty: "Normal",
  stages: [
    { ...Attack4Defense1LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...PrioritizeDefenseShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...BurstAttack5NeoLandozderStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
