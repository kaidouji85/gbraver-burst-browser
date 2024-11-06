import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  HardLightningDozer,
  HardNeoLandozerStage,
  HardWingDozerStage,
} from "./npc-battle-stage";

/** NPCバトル シンブレイバー Hard */
export const ShinBraverHard: NPCBattleCourse = {
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  difficulty: "Hard",
  stages: [
    { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
