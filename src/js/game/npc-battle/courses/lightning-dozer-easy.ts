import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  Attack3Defense2ShinBraverStage,
  MaxAttackWingDozerStage,
  OneBatteryNeoLandozerStage,
} from "./npc-battle-stage";

/** NPCバトル ライトニングドーザー Easy */
export const LightningDozerEasy: NPCBattleCourse = {
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
  difficulty: "Easy",
  stages: [
    { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...Attack3Defense2ShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
