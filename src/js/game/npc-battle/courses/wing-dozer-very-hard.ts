import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { VeryHardGenesisBraver } from "../stages/very-hard-genesis-braver";
import { VeryHardGranDozer } from "../stages/very-hard-gran-dozer";
import { VeryHardLightningDozer } from "../stages/very-hard-lightning-dozer";
import { VeryHardNeoLandozer } from "../stages/very-hard-neo-landozer";
import { VeryHardShinBraver } from "../stages/very-hard-shin-braver";
import { NPCBattleCourse } from "./npc-battle-course";

/** ウィングドーザー NPCバトル VeryHard */
export const WingDozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.WING_DOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    { ...VeryHardGranDozer, bgm: SOUND_IDS.GRAN_DOZER_STRIKE },
    { ...VeryHardGenesisBraver, bgm: SOUND_IDS.YUUYA_BATTLE },
  ],
};
