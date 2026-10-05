import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack4Defense1LightningDozerStage } from "../stages/attack4-defense1-lightning-dozer-stage";
import { FullAttackWingDozerStage } from "../stages/full-attack-wing-dozer-stage";
import { PrioritizeDefenseShinBraverStage } from "../stages/prioritize-defense-shin-braver-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** ネオランドーザー NPCバトル Normal */
export const NeoLandozerNormal: NPCBattleCourse = {
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  difficulty: "Normal",
  stages: [
    { ...Attack4Defense1LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...PrioritizeDefenseShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...FullAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
