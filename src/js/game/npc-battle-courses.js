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
const OneBatteryNeoLandozerStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: oneBatteryNeoLandozerNPC(),
};

/** 1バッテリー シンブレイバー */
const OneBatteryShinBraverStage = {
  caption: OneBatteryNeoLandozerStage.caption,
  npc: oneBatteryShinBraverNPC(),
};

/** 全力攻撃 ウィングドーザ */
const MaxAttackWingDozerStage = {
  caption: ['ゼロ防御だと即', '死する'],
  npc: maxBatteryAttackWingDozerNPC(),
};

/** 全力攻撃 シンブレイバー */
const MaxAttackShinBraverStage = {
  caption: MaxAttackWingDozerStage.caption,
  npc: maxBatteryAttackShinBraverNPC(),
};

/** 3攻撃2防御 ライトングドーザ */
const Attack3Defense2LightningDozerStage = {
  caption: ['相手のバッテリー', '切れを狙え'],
  npc: attack3Defense2LightningDozerNPC(),
};

/** 3攻撃2防御 シンブレイバー */
const Attack3Defense2ShinBraverStage = {
  caption: Attack3Defense2LightningDozerStage.caption,
  npc: attack3Defense2ShinBraverNPC(),
};

/** 4攻撃1防御 ライトニングドーザ */
const Attack4Defense1LightningDozer = {
  caption: ['攻撃にはバッテリーを', '2以上使え'],
  npc: attack4Defense1LightningDozerNPC(),
};

/** 4攻撃1防御 シンブレイバー */
const Attack4Defense1ShinBraver = {
  caption: Attack4Defense1LightningDozer.caption,
  npc: attack4Defense1ShinBraverNPC(),
};

/** 防御優先 ウィングドーザ */
const PrioritizeDefenseWingDozer = {
  caption: ['0攻撃で敵を', '消耗させろ'],
  npc: prioritizeDefenseWingDozer(),
};

/** 防御優先 シンブレイバー */
const PrioritizeDefenseShinBraver = {
  caption: PrioritizeDefenseWingDozer.caption,
  npc: prioritizeDefenseShinBraverNPC(),
};

/** 5攻撃+バースト ネオランドーザ */
const BurstAttack5NeoLandozder = {
  caption: ['同じバッテリーだとダメージ','半減'],
  npc: burstAttack5NeoLandozer(),
};

/** 攻撃全振り ウィングドーザ */
const FullAttackWingDozer = {
  caption: ['バーストで相手を一', '撃粉砕せよ'],
  npc: fullAttackWingDozer(),
};

/** ハードコース シンブレイバー */
const HardShinBraverStage = {
  caption: ['バーストでバッテリー', '回復せよ'],
  npc: hardShinBraver(),
};

/** ハードコース ネオランドーザ */
const HardNeoLandozerStage = {
  caption: ['同じバッテリーならダメージ', '半減'],
  npc: hardNeoLandozer(),
};

/** ハードコース ウィングドーザ */
const HardWingDozerStage = {
  caption: ['バースト、', 'パイロットをフル活用しろ'],
  npc: hardWingDozer(),
};

/** ハードコース ライトニングドーザ */
const HardLightningDozer = {
  caption: ['0攻撃で', 'バリアをやり過ごせ'],
  npc: hardLightningDozer(),
};

/** ベリーハードコース シンブレイバー */
const VeryHardShinBraver = {
  caption: ['荒削りの英雄、', 'シンブレイバー'],
  npc: veryHardShinBraver(),
};

/** ベリーハードコース ウィングドーザ */
const VeryHardWingDozer = {
  caption: ['音速の騎士、', 'ウィングドーザ'],
  npc: veryHardWingDozerNPC(),
};

/** ベリーハードコース ネオランドーザ */
const VeryHardNeoLandozer = {
  caption: ['究極の破壊神、', 'ネオランドーザ'],
  npc: veryHardNeoLandozer(),
};

/** ベリーハードコース ライトニングドーザ */
const VeryHardLightningDozer = {
  caption: ['不屈の守護神、', 'ライトニングドーザ'],
  npc: veryHardLightningDozer(),
};

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: hardNeoLandozer(),
  bgm: SOUND_IDS.BATTLE_BGM_01,
};

/** デフォルトのステージ集合 */
export const DefaultStages: NPCBattleStage[] = [
  {...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01},
  {...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02},
  {...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03},
];

export const NPCBattleCourses: NPCBattleCourse[] = [
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Easy',
    stages: [
      {...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Normal',
    stages: [
      {...Attack4Defense1LightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...PrioritizeDefenseWingDozer, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...BurstAttack5NeoLandozder, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Hard',
    stages: [
      {...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'VeryHard',
    stages: [
      {...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Easy',
    stages: [
      {...OneBatteryShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03}
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Normal',
    stages: [
      {...Attack4Defense1LightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...PrioritizeDefenseWingDozer, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...FullAttackWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03}
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Hard',
    stages: [
      {...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'VeryHard',
    stages: [
      {...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Easy',
    stages: [
      {...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...MaxAttackWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...Attack3Defense2ShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Normal',
    stages: [
      {...Attack4Defense1ShinBraver, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...PrioritizeDefenseWingDozer, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...BurstAttack5NeoLandozder, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Hard',
    stages: [
      {...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...HardWingDozerStage, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'VeryHard',
    stages: [
      {...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...VeryHardWingDozer, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Easy',
    stages: [
      {...OneBatteryNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...MaxAttackShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...Attack3Defense2LightningDozerStage, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Normal',
    stages: [
      {...Attack4Defense1LightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...PrioritizeDefenseShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...BurstAttack5NeoLandozder, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Hard',
    stages: [
      {...HardShinBraverStage, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...HardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...HardNeoLandozerStage, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'VeryHard',
    stages: [
      {...VeryHardLightningDozer, bgm: SOUND_IDS.BATTLE_BGM_01},
      {...VeryHardShinBraver, bgm: SOUND_IDS.BATTLE_BGM_02},
      {...VeryHardNeoLandozer, bgm: SOUND_IDS.BATTLE_BGM_03},
    ]
  },
];