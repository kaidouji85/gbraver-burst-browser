import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  VeryHardGenesisBraver,
  VeryHardNeoLandozer,
  VeryHardShinBraver,
  VeryHardWingDozer,
} from "./npc-battle-stage";

/** ライトニングドーザー NPCバトル VeryHard */
export const LightningDozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    { ...VeryHardGenesisBraver, bgm: SOUND_IDS.YUUYA_BATTLE },
  ],
};
