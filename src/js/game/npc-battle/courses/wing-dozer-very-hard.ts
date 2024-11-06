import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  VeryHardLightningDozer,
  VeryHardNeoLandozer,
  VeryHardShinBraver,
} from "./npc-battle-stage";

/** ウィングドーザー NPCバトル VeryHard */
export const WingDozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.WING_DOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
