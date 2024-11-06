import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../../resource/sound/ids";
import { NPCBattleCourse } from "../npc-battle-course";
import {
  Attack4Defense1LightningDozerStage,
  FullAttackWingDozerStage,
  PrioritizeDefenseShinBraverStage,
} from "./npc-battle-stage";

/** ネオランドーザー NPCバトル Normal */
export const NeoLandozerNormal: NPCBattleCourse = {
  armdozerId: ArmdozerIds.NEO_LANDOZER,
  difficulty: "Normal",
  stages: [
    { ...Attack4Defense1LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
    { ...PrioritizeDefenseShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
    { ...FullAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
  ],
};
