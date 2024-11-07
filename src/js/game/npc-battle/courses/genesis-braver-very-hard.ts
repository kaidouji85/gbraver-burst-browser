import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import {
  VeryHardLightningDozer,
  VeryHardNeoLandozer,
  VeryHardShinBraver,
  VeryHardWingDozer,
} from "../stages/npc-battle-stages";
import { NPCBattleCourse } from "./npc-battle-course";

/** ジェネシスブレイバー NPCバトル VeryHard */
export const GenesisBraverVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.GENESIS_BRAVER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.QUEEN_OF_TRAGEDY },
  ],
};
