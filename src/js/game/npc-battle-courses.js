// @flow
import {normalNeoLandozer} from "../npc/normal-neo-landozer";
import {SOUND_IDS} from "../resource/sound";
import type {NPCBattleStage} from "./npc-battle";
import {oneBatteryNeoLandozerNPC, oneBatteryShinBraverNPC} from "../npc/one-battery";
import {maxBatteryAttackShinBraverNPC, maxBatteryAttackWingDozerNPC} from "../npc/max-battery-attack";
import {attack3Defense2LightningDozerNPC, attack3Defense2ShinBraverNPC} from "../npc/attack-3-defense-2";
import {normalShinBraver} from "../npc/normal-shin-braver";
import {normalWingDozer} from "../npc/normal-wing-dozer";
import {normalLightningDozer} from "../npc/normal-lightning-dozer";
import {hardShinBraver} from "../npc/hard-shin-braver";
import {hardWingDozerNPC} from "../npc/hard-wing-dozer";
import {hardNeoLandozer} from "../npc/hard-neo-landozer";
import {hardLightningDozer} from "../npc/hard-lightning-dozer";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";

/** NPCバトルコース難易度 */
export type NPCBattleCourseDifficulty = 'Easy' | 'Normal' | 'Hard';

/**
 * NPCバトルコースマスタ
 * 本データはプレイヤー状況とそれに対応したコースの組み合わせである
 */
export type NPCBattleCourse = {
  /** プレイヤーが選択したアームドーザID */
  armdozerId: ArmDozerId,
  /** プレイヤーが選択した難易度 */
  difficulty: NPCBattleCourseDifficulty,
  /** 本コースの全ステージ */
  stages: NPCBattleStage[],
};

/** 1バッテリー ネオランドーザ */
const OneBatteryNeoLandozerStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: oneBatteryNeoLandozerNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** 1バッテリー シンブレイバー */
const OneBatteryShinBraverStage: NPCBattleStage = {
  caption: OneBatteryNeoLandozerStage.caption,
  npc: oneBatteryShinBraverNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** 全力攻撃 ウィングドーザ */
const MaxAttackWingDozerStage: NPCBattleStage = {
  caption: ['ゼロ防御だと即', '死する'],
  npc: maxBatteryAttackWingDozerNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** 全力攻撃 シンブレイバー */
const MaxAttackShinBraverStage: NPCBattleStage = {
  caption: MaxAttackWingDozerStage.caption,
  npc: maxBatteryAttackShinBraverNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** 3攻撃2防御 ライトングドーザ */
const Attack3Defense2LightningDozerStage: NPCBattleStage = {
  caption: ['相手のバッテリー', '切れを狙え'],
  npc: attack3Defense2LightningDozerNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** 3攻撃2防御 シンブレイバー */
const Attack3Defense2ShinBraverStage: NPCBattleStage = {
  caption: Attack3Defense2LightningDozerStage.caption,
  npc: attack3Defense2ShinBraverNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** ノーマルコース シンブレイバー */
const NormalShinBraverStage: NPCBattleStage = {
  caption: ['バーストでバッテリー', '回復せよ'],
  npc: normalShinBraver(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** ノーマルコース ネオランドーザ */
const NormalNeoLandozerStage: NPCBattleStage = {
  caption: ['同じバッテリーならダメージ', '半減'],
  npc: normalNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** ノーマルコース ウィングドーザ */
const NormalWingDozerStage: NPCBattleStage = {
  caption: ['バースト、', 'パイロットをフル活用しろ'],
  npc: normalWingDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** ノーマルコース ライトニングドーザ */
const NormalLightningDozer: NPCBattleStage = {
  caption: ['0攻撃で', 'バリアをやり過ごせ'],
  npc: normalLightningDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** ハードコース シンブレイバー */
const HardShinBraver: NPCBattleStage = {
  caption: ['荒削りの英雄、', 'シンブレイバー'],
  npc: hardShinBraver(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** ハードコース ウィングドーザ */
const HardWingDozer: NPCBattleStage = {
  caption: ['音速の騎士、', 'ウィングドーザ'],
  npc: hardWingDozerNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** ハードコース ネオランドーザ */
const HardNeoLandozer: NPCBattleStage = {
  caption: ['究極の破壊神、', 'ネオランドーザ'],
  npc: hardNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** ハードコース ライトニングドーザ */
const HardLightningDozer: NPCBattleStage = {
  caption: ['不屈の守護神、', 'ライトニングドーザ'],
  npc: hardLightningDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: normalNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** デフォルトのステージ集合 */
export const DefaultStages: NPCBattleStage[] = [
  OneBatteryNeoLandozerStage,
  MaxAttackWingDozerStage,
  Attack3Defense2LightningDozerStage
];

export const NPCBattleCourses: NPCBattleCourse[] = [
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Easy',
    stages: [
      OneBatteryNeoLandozerStage,
      MaxAttackWingDozerStage,
      Attack3Defense2LightningDozerStage
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Normal',
    stages: [
      NormalWingDozerStage,
      NormalLightningDozer,
      NormalNeoLandozerStage,
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Hard',
    stages: [
      HardLightningDozer,
      HardNeoLandozer,
      HardWingDozer,
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Easy',
    stages: [
      OneBatteryShinBraverStage,
      MaxAttackWingDozerStage,
      Attack3Defense2LightningDozerStage
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Normal',
    stages: [
      NormalShinBraverStage,
      NormalWingDozerStage,
      NormalLightningDozer,
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Hard',
    stages: [
      HardLightningDozer,
      HardShinBraver,
      HardWingDozer,
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Easy',
    stages: [
      OneBatteryNeoLandozerStage,
      MaxAttackWingDozerStage,
      Attack3Defense2ShinBraverStage
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Normal',
    stages: [
      NormalShinBraverStage,
      NormalWingDozerStage,
      NormalNeoLandozerStage,
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Hard',
    stages: [
      HardNeoLandozer,
      HardShinBraver,
      HardWingDozer,
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Easy',
    stages: [
      OneBatteryNeoLandozerStage,
      MaxAttackShinBraverStage,
      Attack3Defense2LightningDozerStage
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Normal',
    stages: [
      NormalShinBraverStage,
      NormalLightningDozer,
      NormalNeoLandozerStage,
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Hard',
    stages: [
      HardLightningDozer,
      HardNeoLandozer,
      HardShinBraver,
    ]
  },
];