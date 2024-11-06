import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  Attack3Defense2LightningDozerStage,
  MaxAttackShinBraverStage,
  OneBatteryNeoLandozerStage,
} from "./npc-battle-stage";

/** NPCバトル ウィングドーザー Easy */
export const WingDozerEasy: NPCBattleCourse = {
  armdozerId: ArmdozerIds.WING_DOZER,
  difficulty: "Easy",
  stages: [
    { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...MaxAttackShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
