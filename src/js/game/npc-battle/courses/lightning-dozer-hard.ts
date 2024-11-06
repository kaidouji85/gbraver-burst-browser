import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  HardNeoLandozerStage,
  HardShinBraverStage,
  HardWingDozerStage,
} from "./npc-battle-stage";

/** ライトニングドーザー NPCバトル Hard */
export const LightningDozerHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  difficulty: "Hard",
  stages: [
    { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
