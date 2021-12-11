// @flow
import type {ArmDozerId} from 'gbraver-burst-core';
import {ArmDozerIdList} from "gbraver-burst-core";
import {attack3Defense2LightningDozerNPC, attack3Defense2ShinBraverNPC} from "../../npc/attack-3-defense-2";
import {oneBatteryNeoLandozerNPC, oneBatteryShinBraverNPC} from "../../npc/one-battery";
import {maxBatteryAttackShinBraverNPC, maxBatteryAttackWingDozerNPC} from "../../npc/max-battery-attack";
import type {NPCBattleCourse, NPCBattleCourseContainer, NPCBattleCourseDifficulty} from "./npc-battle-course";
import {SimpleNPCBattleCourse} from "./simple-npc-battle-course";
import type {NPCBattleStage} from "./npc-battle-stage";
import {burstNeoLandozer} from "../../npc/burst-neo-landozer";
import {burstWingDozer} from "../../npc/burst-wing-dozer";
import {burstLightningDozer} from "../../npc/burst-lightning-dozer";

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

/** バースト発動 ネオランドーザ */
const BurstNeoLandozerStage: NPCBattleStage = {
  caption: ['最強の破壊神', 'ネオランドーザ'],
  npc: burstNeoLandozer(),
};

/** バースト発動 ウィングドーザ */
const BurstWingDozerStage: NPCBattleStage = {
  caption: ['音速の騎士', 'ウィングドーザ'],
  npc: burstWingDozer(),
};

/** バースト発動 ライトニングドーザ */
const BurstLightningDozer: NPCBattleStage = {
  caption: ['不屈の守護神', 'ライトニングドーザ'],
  npc: burstLightningDozer()
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
      BurstNeoLandozerStage,
      BurstWingDozerStage,
      BurstLightningDozer,
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
      BurstNeoLandozerStage,
      BurstWingDozerStage,
      BurstLightningDozer
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
      BurstNeoLandozerStage,
      BurstWingDozerStage,
      BurstLightningDozer
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
      BurstNeoLandozerStage,
      BurstWingDozerStage,
      BurstLightningDozer
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