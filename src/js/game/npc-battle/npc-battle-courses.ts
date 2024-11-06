import { ArmdozerIds } from "gbraver-burst-core";

import { SOUND_IDS } from "../../resource/sound/ids";
import type { NPCBattleStage } from "./npc-battle";
import { NPCBattleCourse } from "./npc-battle-course";
import {
  Attack3Defense2LightningDozerStage,
  Attack3Defense2ShinBraverStage,
  Attack4Defense1LightningDozerStage,
  Attack4Defense1ShinBraverStage,
  BurstAttack5NeoLandozderStage,
  FullAttackWingDozerStage,
  HardLightningDozer,
  HardNeoLandozerStage,
  HardShinBraverStage,
  HardWingDozerStage,
  MaxAttackShinBraverStage,
  MaxAttackWingDozerStage,
  OneBatteryNeoLandozerStage,
  OneBatteryShinBraverStage,
  PrioritizeDefenseShinBraverStage,
  PrioritizeDefenseWingDozerStage,
  VeryHardLightningDozer,
  VeryHardNeoLandozer,
  VeryHardShinBraver,
  VeryHardWingDozer,
} from "./npc-battle-stage";
import { ShinBraverEasy } from "./shin-braver-easy";
import { ShinBraverNormal } from "./shin-braver-normal";
import {ShinBraverHard} from "./shin-braver-hard";
import {ShinBraverVeryHard} from "./shin-braver-very-hard";
import {NeoLandozerEasy} from "./neo-landozer-easy";
import {NeoLandozerNormal} from "./neo-landozer-normal";
import {NeoLandozerHard} from "./neo-landozer-hard";
import {NeoLandozerVeryHard} from "./neo-landozer-very-hard";

/** デフォルトのステージ集合 */
export const DefaultStages: NPCBattleStage[] = [
  { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
  { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
  { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
];

/** NPCバトルコース */
export const NPCBattleCourses: NPCBattleCourse[] = [
  ShinBraverEasy,
  ShinBraverNormal,
  ShinBraverHard,
  ShinBraverVeryHard,
  NeoLandozerEasy,
  NeoLandozerNormal,
  NeoLandozerHard,
  NeoLandozerVeryHard,
  {
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    difficulty: "Easy",
    stages: [
      { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...Attack3Defense2ShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    difficulty: "Normal",
    stages: [
      { ...Attack4Defense1ShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...PrioritizeDefenseWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...BurstAttack5NeoLandozderStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    difficulty: "Hard",
    stages: [
      { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.LIGHTNING_DOZER,
    difficulty: "VeryHard",
    stages: [
      { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.WING_DOZER,
    difficulty: "Easy",
    stages: [
      { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...MaxAttackShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.WING_DOZER,
    difficulty: "Normal",
    stages: [
      { ...Attack4Defense1LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...PrioritizeDefenseShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...BurstAttack5NeoLandozderStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.WING_DOZER,
    difficulty: "Hard",
    stages: [
      { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.WING_DOZER,
    difficulty: "VeryHard",
    stages: [
      { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.SHIN_BRAVER,
    difficulty: "Easy",
    stages: [
      { ...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.GENESIS_BRAVER,
    difficulty: "Normal",
    stages: [
      { ...Attack4Defense1LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...PrioritizeDefenseWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...BurstAttack5NeoLandozderStage, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.GENESIS_BRAVER,
    difficulty: "Hard",
    stages: [
      { ...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
  {
    armdozerId: ArmdozerIds.GENESIS_BRAVER,
    difficulty: "VeryHard",
    stages: [
      { ...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01 },
      { ...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02 },
      { ...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03 },
    ],
  },
];
