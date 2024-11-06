import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../resource/sound/ids";
import { NPCBattleCourse } from "./npc-battle-course";
import {
  Attack3Defense2LightningDozerStage,
  MaxAttackWingDozerStage,
  OneBatteryShinBraverStage,
} from "./npc-battle-stage";

/** ネオランドーザー NPCバトル Easy */
export const NeoLandozerEasy: NPCBattleCourse = {
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  difficulty: "Easy",
  stages: [
    { ...OneBatteryShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
