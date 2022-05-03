// @flow
import {hardNeoLandozer} from "../npc/hard-neo-landozer";
import {SOUND_IDS} from "../resource/sound";
import type {NPCBattleStage} from "./npc-battle";
import {oneBatteryNeoLandozerNPC, oneBatteryShinBraverNPC} from "../npc/one-battery";
import {maxBatteryAttackShinBraverNPC, maxBatteryAttackWingDozerNPC} from "../npc/max-battery-attack";
import {attack3Defense2LightningDozerNPC, attack3Defense2ShinBraverNPC} from "../npc/attack-3-defense-2";
import {hardShinBraver} from "../npc/hard-shin-braver";
import {hardWingDozer} from "../npc/hard-wing-dozer";
import {hardLightningDozer} from "../npc/hard-lightning-dozer";
import {veryHardShinBraver} from "../npc/very-hard-shin-braver";
import {veryHardWingDozerNPC} from "../npc/very-hard-wing-dozer";
import {veryHardNeoLandozer} from "../npc/very-hard-neo-landozer";
import {veryHardLightningDozer} from "../npc/very-hard-lightning-dozer";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import {attack4Defense1LightningDozerNPC, attack4Defense1ShinBraverNPC} from "../npc/attack-4-defense-1";
import {prioritizeDefenseWingDozer, prioritizeDefenseShinBraverNPC} from "../npc/prioritize-defense";
import {burstAttack5NeoLandozer} from "../npc/burst-attack-5-neo-landozer";
import {fullAttackWingDozer} from "../npc/full-attack-wing-dozer";

/** NPCバトルコース難易度 */
export type NPCBattleCourseDifficulty = 'Easy' | 'Normal' | 'Hard' | 'VeryHard';

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

/** 4攻撃1防御 ライトニングドーザ */
const Attack4Defense1LightningDozer: NPCBattleStage = {
  caption: ['攻撃にはバッテリーを', '2以上使え'],
  npc: attack4Defense1LightningDozerNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** 4攻撃1防御 シンブレイバー */
const Attack4Defense1ShinBraver: NPCBattleStage = {
  caption: Attack4Defense1LightningDozer.caption,
  npc: attack4Defense1ShinBraverNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** 防御優先 ウィングドーザ */
const PrioritizeDefenseWingDozer: NPCBattleStage = {
  caption: ['0攻撃で敵を', '消耗させろ'],
  npc: prioritizeDefenseWingDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** 防御優先 シンブレイバー */
const PrioritizeDefenseShinBraver: NPCBattleStage = {
  caption: PrioritizeDefenseWingDozer.caption,
  npc: prioritizeDefenseShinBraverNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** 5攻撃+バースト ネオランドーザ */
const BurstAttack5NeoLandozder: NPCBattleStage = {
  caption: ['同じバッテリーだとダメージ','半減'],
  npc: burstAttack5NeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** 攻撃全振り ウィングドーザ */
const FullAttackWingDozer = {
  caption: ['バーストで相手を一', '撃粉砕せよ'],
  npc: fullAttackWingDozer(),
};

/** ハードコース シンブレイバー */
const HardShinBraverStage: NPCBattleStage = {
  caption: ['バーストでバッテリー', '回復せよ'],
  npc: hardShinBraver(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** ハードコース ネオランドーザ */
const HardNeoLandozerStage: NPCBattleStage = {
  caption: ['同じバッテリーならダメージ', '半減'],
  npc: hardNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** ハードコース ウィングドーザ */
const HardWingDozerStage: NPCBattleStage = {
  caption: ['バースト、', 'パイロットをフル活用しろ'],
  npc: hardWingDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** ハードコース ライトニングドーザ */
const HardLightningDozer: NPCBattleStage = {
  caption: ['0攻撃で', 'バリアをやり過ごせ'],
  npc: hardLightningDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** ベリーハードコース シンブレイバー */
const VeryHardShinBraver: NPCBattleStage = {
  caption: ['荒削りの英雄、', 'シンブレイバー'],
  npc: veryHardShinBraver(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** ベリーハードコース ウィングドーザ */
const VeryHardWingDozer: NPCBattleStage = {
  caption: ['音速の騎士、', 'ウィングドーザ'],
  npc: veryHardWingDozerNPC(),
  bgm: SOUND_IDS.BATTLE_BGM_03,
};

/** ベリーハードコース ネオランドーザ */
const VeryHardNeoLandozer: NPCBattleStage = {
  caption: ['究極の破壊神、', 'ネオランドーザ'],
  npc: veryHardNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_02,
};

/** ベリーハードコース ライトニングドーザ */
const VeryHardLightningDozer: NPCBattleStage = {
  caption: ['不屈の守護神、', 'ライトニングドーザ'],
  npc: veryHardLightningDozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: hardNeoLandozer(),
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
      Attack4Defense1LightningDozer,
      PrioritizeDefenseWingDozer,
      BurstAttack5NeoLandozder,
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Hard',
    stages: [
      HardWingDozerStage,
      HardLightningDozer,
      HardNeoLandozerStage,
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'VeryHard',
    stages: [
      VeryHardLightningDozer,
      VeryHardNeoLandozer,
      VeryHardWingDozer,
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
      Attack4Defense1LightningDozer,
      PrioritizeDefenseWingDozer,
      {...FullAttackWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03}
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Hard',
    stages: [
      HardShinBraverStage,
      HardWingDozerStage,
      HardLightningDozer,
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'VeryHard',
    stages: [
      VeryHardLightningDozer,
      VeryHardShinBraver,
      VeryHardWingDozer,
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
      Attack4Defense1ShinBraver,
      PrioritizeDefenseWingDozer,
      BurstAttack5NeoLandozder,
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Hard',
    stages: [
      HardShinBraverStage,
      HardWingDozerStage,
      HardNeoLandozerStage,
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'VeryHard',
    stages: [
      VeryHardNeoLandozer,
      VeryHardShinBraver,
      VeryHardWingDozer,
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
      Attack4Defense1LightningDozer,
      PrioritizeDefenseShinBraver,
      BurstAttack5NeoLandozder,
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Hard',
    stages: [
      HardShinBraverStage,
      HardLightningDozer,
      HardNeoLandozerStage,
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'VeryHard',
    stages: [
      VeryHardLightningDozer,
      VeryHardShinBraver,
      VeryHardNeoLandozer,
    ]
  },
];