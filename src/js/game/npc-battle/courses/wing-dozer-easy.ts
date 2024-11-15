import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack3Defense2LightningDozerStage } from "../stages/attack3-defense2-lightning-dozer-stage";
import { MaxAttackShinBraverStage } from "../stages/max-attack-shin-braver-stage";
import { OneBatteryNeoLandozerStage } from "../stages/one-battery-neo-landozer-stage";
import { NPCBattleCourse } from "./npc-battle-course";

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
