import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack3Defense2ShinBraverStage } from "../stages/attack3-defense2-shin-braver-stage";
import { MaxAttackWingDozerStage } from "../stages/max-attack-wing-dozer-stage";
import { OneBatteryNeoLandozerStage } from "../stages/one-battery-neo-landozer-stage";
import { NPCBattleCourse } from "./npc-battle-course";

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
