import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../resource/sound/ids";
import { NPCBattleCourse } from "./npc-battle-course";
import {
  VeryHardLightningDozer,
  VeryHardNeoLandozer,
  VeryHardWingDozer,
} from "./npc-battle-stage";

/** シンブレイバー NPCバトル VeryHard */
export const ShinBraverVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
