import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { VeryHardGenesisBraver } from "../stages/very-hard-genesis-braver";
import { VeryHardLightningDozer } from "../stages/very-hard-lightning-dozer";
import { VeryHardNeoLandozer } from "../stages/very-hard-neo-landozer";
import { VeryHardWingDozer } from "../stages/very-hard-wing-dozer";
import { NPCBattleCourse } from "./npc-battle-course";

/** NPCバトル グランドーザ VeryHard */
export const GranDozerVeryHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.GRAN_DOZER,
  difficulty: "VeryHard",
  stages: [
    { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    { ...VeryHardGenesisBraver, bgm: SOUND_IDS.YUUYA_BATTLE },
  ],
};
