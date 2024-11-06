import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../resource/sound/ids";
import { NPCBattleCourse } from "./npc-battle-course";
import {
  Attack3Defense2LightningDozerStage,
  MaxAttackWingDozerStage,
  OneBatteryNeoLandozerStage,
} from "./npc-battle-stage";

/** NPCバトル シンブレイバー Easy */
export const ShinBraverEasy: NPCBattleCourse = {
  armdozerId: ArmdozerIds.SHIN_BRAVER,
  difficulty: "Easy",
  stages: [
    { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
