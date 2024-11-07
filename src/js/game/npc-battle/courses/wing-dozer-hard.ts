import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import {
  HardLightningDozer,
  HardNeoLandozerStage,
  HardShinBraverStage,
} from "../stages/npc-battle-stages";
import { NPCBattleCourse } from "./npc-battle-course";

/** ウィングドーザー NPCバトル Hard */
export const WingDozerHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.WING_DOZER,
  difficulty: "Hard",
  stages: [
    { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
