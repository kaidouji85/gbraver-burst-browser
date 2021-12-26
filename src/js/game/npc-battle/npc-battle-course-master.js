// @flow
import type {ArmDozerId} from 'gbraver-burst-core';
import {ArmDozerIdList} from "gbraver-burst-core";
import {attack3Defense2LightningDozerNPC, attack3Defense2ShinBraverNPC} from "../../npc/attack-3-defense-2";
import {oneBatteryNeoLandozerNPC, oneBatteryShinBraverNPC} from "../../npc/one-battery";
import {maxBatteryAttackShinBraverNPC, maxBatteryAttackWingDozerNPC} from "../../npc/max-battery-attack";
import type {NPCBattleCourse, NPCBattleCourseContainer, NPCBattleCourseDifficulty} from "./npc-battle-course";
import {SimpleNPCBattleCourse} from "./simple-npc-battle-course";
import type {NPCBattleStage} from "./npc-battle-stage";
import {normalNeoLandozer} from "../../npc/normal-neo-landozer";
import {normalWingDozer} from "../../npc/normal-wing-dozer";
import {normalLightningDozer} from "../../npc/normal-lightning-dozer";
import {normalShinBraver} from "../../npc/normal-shin-braver";
import {hardLightningDozer} from "../../npc/hard-lightning-dozer";
import {hardShinBraver} from "../../npc/hard-shin-braver";
import {hardWingDozerNPC} from "../../npc/hard-wing-dozer";
import {hardNeoLandozer} from "../../npc/hard-neo-landozer";

/** 1バッテリー ネオランドーザ */
const OneBatteryNeoLandozerStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: oneBatteryNeoLandozerNPC()
};

/** 1バッテリー シンブレイバー */
const OneBatteryShinBraverStage: NPCBattleStage = {
  caption: OneBatteryNeoLandozerStage.caption,
  npc: oneBatteryShinBraverNPC(),
};

/** 全力攻撃 ウィングドーザ */
const MaxAttackWingDozerStage: NPCBattleStage = {
  caption: ['ゼロ防御だと即', '死する'],
  npc: maxBatteryAttackWingDozerNPC()
};

/** 全力攻撃 シンブレイバー */
const MaxAttackShinBraverStage: NPCBattleStage = {
  caption: MaxAttackWingDozerStage.caption,
  npc: maxBatteryAttackShinBraverNPC()
};

/** 3攻撃2防御 ライトングドーザ */
const Attack3Defense2LightningDozerStage: NPCBattleStage = {
  caption: ['相手のバッテリー', '切れを狙え'],
  npc: attack3Defense2LightningDozerNPC()
};

/** 3攻撃2防御 シンブレイバー */
const Attack3Defense2ShinBraverStage: NPCBattleStage = {
  caption: Attack3Defense2LightningDozerStage.caption,
  npc: attack3Defense2ShinBraverNPC()
};

/** ノーマルコース シンブレイバー */
const NormalShinBraverStage: NPCBattleStage = {
  caption: ['バーストでバッテリー', '回復せよ'],
  npc: normalShinBraver(),
};

/** ノーマルコース ネオランドーザ */
const NormalNeoLandozerStage: NPCBattleStage = {
  caption: ['同じバッテリーならダメージ', '半減'],
  npc: normalNeoLandozer(),
};

/** ノーマルコース ウィングドーザ */
const NormalWingDozerStage: NPCBattleStage = {
  caption: ['バースト、', 'パイロットをフル活用しろ'],
  npc: normalWingDozer(),
};

/** ノーマルコース ライトニングドーザ */
const NormalLightningDozer: NPCBattleStage = {
  caption: ['0攻撃で', 'バリアをやり過ごせ'],
  npc: normalLightningDozer()
};

/** ハードコース シンブレイバー */
const HardShinBraver: NPCBattleStage = {
  caption: ['荒削りの英雄、', 'シンブレイバー'],
  npc: hardShinBraver(),
};

/** ハードコース ウィングドーザ */
const HardWingDozer: NPCBattleStage = {
  caption: ['音速の騎士、', 'ウィングドーザ'],
  npc: hardWingDozerNPC()
};

/** ハードコース ネオランドーザ */
const HardNeoLandozer: NPCBattleStage = {
  caption: ['究極の破壊神、', 'ネオランドーザ'],
  npc: hardNeoLandozer()
};

/** ハードコース ライトニングドーザ */
const HardLightningDozer: NPCBattleStage = {
  caption: ['不屈の守護神、', 'ライトニングドーザ'],
  npc: hardLightningDozer()
};

/** デフォルトのコース */
const DefaultCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackWingDozerStage,
  Attack3Defense2LightningDozerStage
]);

/** アームドーザ、難易度、コースの対応関係 */
type CourseMap = {
  /** プレイヤーが選択したアームドーザID */
  armdozerId: ArmDozerId,
  /** プレイヤーが選択した難易度 */
  difficulty: NPCBattleCourseDifficulty,
  /** コース */
  course: NPCBattleCourse
};

/** コースを集めたもの */
const Courses: CourseMap[] = [
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Easy',
    course: new SimpleNPCBattleCourse([
      OneBatteryNeoLandozerStage,
      MaxAttackWingDozerStage,
      Attack3Defense2LightningDozerStage
    ])
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Normal',
    course: new SimpleNPCBattleCourse([
      NormalWingDozerStage,
      NormalLightningDozer,
      NormalNeoLandozerStage,
    ])
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    difficulty: 'Hard',
    course: new SimpleNPCBattleCourse([
      HardLightningDozer,
      HardNeoLandozer,
      HardWingDozer,
    ])
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Easy',
    course: new SimpleNPCBattleCourse([
      OneBatteryShinBraverStage,
      MaxAttackWingDozerStage,
      Attack3Defense2LightningDozerStage
    ])
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Normal',
    course: new SimpleNPCBattleCourse([
      NormalShinBraverStage,
      NormalWingDozerStage,
      NormalLightningDozer,
    ])
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    difficulty: 'Hard',
    course: new SimpleNPCBattleCourse([
      HardLightningDozer,
      HardShinBraver,
      HardWingDozer,
    ])
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Easy',
    course: new SimpleNPCBattleCourse([
      OneBatteryNeoLandozerStage,
      MaxAttackWingDozerStage,
      Attack3Defense2ShinBraverStage
    ])
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Normal',
    course: new SimpleNPCBattleCourse([
      NormalShinBraverStage,
      NormalWingDozerStage,
      NormalNeoLandozerStage,
    ])
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    difficulty: 'Hard',
    course: new SimpleNPCBattleCourse([
      HardNeoLandozer,
      HardShinBraver,
      HardWingDozer,
    ])
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Easy',
    course: new SimpleNPCBattleCourse([
      OneBatteryNeoLandozerStage,
      MaxAttackShinBraverStage,
      Attack3Defense2LightningDozerStage
    ])
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Normal',
    course: new SimpleNPCBattleCourse([
      NormalShinBraverStage,
      NormalLightningDozer,
      NormalNeoLandozerStage,
    ])
  },
  {
    armdozerId: ArmDozerIdList.WING_DOZER,
    difficulty: 'Hard',
    course: new SimpleNPCBattleCourse([
      HardLightningDozer,
      HardNeoLandozer,
      HardShinBraver,
    ])
  },
];

/** NPCバトルコースマスタ */
export const NPCBattleCourseMaster: NPCBattleCourseContainer = {
  /** @override */
  find(armdozerId: ArmDozerId, difficulty: NPCBattleCourseDifficulty) {
    return Courses.find(v => v.armdozerId === armdozerId && v.difficulty === difficulty)?.course ?? DefaultCourse
  }
}