import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { VeryHardGenesisBraver } from "../stages/very-hard-genesis-braver";
import { VeryHardGranDozer } from "../stages/very-hard-gran-dozer";
import { VeryHardNeoLandozer } from "../stages/very-hard-neo-landozer";
import { VeryHardShinBraver } from "../stages/very-hard-shin-braver";
import { VeryHardWingDozer } from "../stages/very-hard-wing-dozer";
import { NPCBattleCourse } from "./npc-battle-course";

/** ライトニングドーザー NPCバトル VeryHard */
export const LightningDozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardGranDozer, bgm: SOUND_IDS.GRAN_DOZER_STRIKE },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    { ...VeryHardGenesisBraver, bgm: SOUND_IDS.YUUYA_BATTLE },
  ],
};
