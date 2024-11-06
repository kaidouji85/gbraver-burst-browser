import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  Attack4Defense1LightningDozerStage,
  BurstAttack5NeoLandozderStage,
  PrioritizeDefenseShinBraverStage,
} from "./npc-battle-stage";

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
