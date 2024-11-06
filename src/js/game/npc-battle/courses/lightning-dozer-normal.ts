import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  Attack4Defense1ShinBraverStage,
  BurstAttack5NeoLandozderStage,
  PrioritizeDefenseWingDozerStage,
} from "./npc-battle-stage";

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
