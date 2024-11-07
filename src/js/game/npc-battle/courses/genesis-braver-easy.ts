import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import {
  Attack3Defense2LightningDozerStage,
  MaxAttackWingDozerStage,
  OneBatteryNeoLandozerStage,
} from "../stages/npc-battle-stages";
import { NPCBattleCourse } from "./npc-battle-course";

/** NPCバトル ジェネシスブレイバー Easy */
export const GenesisBraverEasy: NPCBattleCourse = {
  armdozerId: ArmdozerIds.GENESIS_BRAVER,
  difficulty: "Easy",
  stages: [
    { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
