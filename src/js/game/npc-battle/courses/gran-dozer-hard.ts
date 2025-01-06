import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { HardLightningDozer } from "../stages/hard-lightning-dozer";
import { HardNeoLandozerStage } from "../stages/hard-neo-landozer-stage";
import { HardWingDozerStage } from "../stages/hard-wing-dozer-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** NPCバトル グランドーザ Hard */
export const GranDozerHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.GRAN_DOZER,
  difficulty: "Hard",
  stages: [
    { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
