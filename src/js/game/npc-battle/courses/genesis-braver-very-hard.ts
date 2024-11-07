import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { VeryHardLightningDozer } from "../stages/very-hard-lightning-dozer";
import { VeryHardNeoLandozer } from "../stages/very-hard-neo-landozer";
import { VeryHardShinBraver } from "../stages/very-hard-shin-braver";
import { VeryHardWingDozer } from "../stages/very-hard-wing-dozer";
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
