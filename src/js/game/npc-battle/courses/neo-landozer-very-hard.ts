import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { VeryHardGenesisBraver } from "../stages/very-hard-genesis-braver";
import { VeryHardGranDozer } from "../stages/very-hard-gran-dozer";
import { VeryHardLightningDozer } from "../stages/very-hard-lightning-dozer";
import { VeryHardShinBraver } from "../stages/very-hard-shin-braver";
import { VeryHardWingDozer } from "../stages/very-hard-wing-dozer";
import { NPCBattleCourse } from "./npc-battle-course";

/** ネオランドーザー NPCバトル VeryHard */
export const NeoLandozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardGranDozer, bgm: SOUND_IDS.GRAN_DOZER_STRIKE },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    { ...VeryHardGenesisBraver, bgm: SOUND_IDS.YUUYA_BATTLE },
  ],
};
