import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../resource/sound/ids";
import { NPCBattleCourse } from "./npc-battle-course";
import {
  HardLightningDozer,
  HardShinBraverStage,
  HardWingDozerStage,
} from "./npc-battle-stage";

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
