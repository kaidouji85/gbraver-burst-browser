import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { HardLightningDozer } from "../stages/hard-lightning-dozer";
import { HardNeoLandozerStage } from "../stages/hard-neo-landozer-stage";
import { HardShinBraverStage } from "../stages/hard-shin-braver-stage";
import { NPCBattleCourse } from "./npc-battle-course";

/** ウィングドーザー NPCバトル Hard */
export const WingDozerHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.WING_DOZER,
  difficulty: "Hard",
  stages: [
    { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
