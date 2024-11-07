import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { Attack3Defense2LightningDozerStage } from "../stages/attack3-defense2-lightning-dozer-stage";
import { MaxAttackWingDozerStage } from "../stages/max-attack-wing-dozer-stage";
import { OneBatteryNeoLandozerStage } from "../stages/one-battery-neo-landozer-stage";
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
