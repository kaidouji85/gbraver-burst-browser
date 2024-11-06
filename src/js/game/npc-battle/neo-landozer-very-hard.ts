import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../resource/sound/ids";
import { NPCBattleCourse } from "./npc-battle-course";
import {
  VeryHardLightningDozer,
  VeryHardShinBraver,
  VeryHardWingDozer,
} from "./npc-battle-stage";

/** ネオランドーザー NPCバトル VeryHard */
export const NeoLandozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
