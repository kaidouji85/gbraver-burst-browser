import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import {
  HardLightningDozer,
  HardShinBraverStage,
  HardWingDozerStage,
} from "../stages/npc-battle-stages";
import { NPCBattleCourse } from "./npc-battle-course";

/** ネオランドーザー NPCバトル Hard */
export const NeoLandozerHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  difficulty: "Hard",
  stages: [
    { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
