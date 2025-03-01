import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { HardLightningDozer } from "../stages/hard-lightning-dozer";
import { HardShinBraverStage } from "../stages/hard-shin-braver-stage";
import { HardWingDozerStage } from "../stages/hard-wing-dozer-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** NPCバトル グランドーザ Hard */
export const GranDozerHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.GRAN_DOZER,
  difficulty: "Hard",
  stages: [
    { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
