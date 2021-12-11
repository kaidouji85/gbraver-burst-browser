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
  caption: ['最強の破壊神', 'ネオランドーザ爆誕'],
  npc: burstNeoLandozer(),
};

/** シンブレイバー Easy コース */
const ShinBraverEasyCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackWingDozerStage,
  Attack3Defense2LightningDozerStage
]);

/** シンブレイバー Normal コース */
const ShinBraverNormalCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  BurstNeoLandozerStage,
]);

/** ネオランドーザ Easy コース */
const NeoLandozerEasyCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryShinBraverStage,
  MaxAttackWingDozerStage,
  Attack3Defense2LightningDozerStage
]);

/** ネオランドーザ Normal コース */
const NeoLandozerNormalCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  BurstNeoLandozerStage,
]);


/** ライトニングドーザ Easy コース */
const LightningDozerEasyCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackWingDozerStage,
  Attack3Defense2ShinBraverStage
]);

/** ライトニングドーザ Normal コース */
const LightningDozerNormalCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  BurstNeoLandozerStage,
]);

/** ウィングドーザ Easy コース */
const WingDozerEasyCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackShinBraverStage,
  Attack3Defense2LightningDozerStage
]);

/** ウィングドーザ Normal コース */
const WingDozerNormalCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  BurstNeoLandozerStage,
]);

/** NPCバトルコースマスタ */
export const NPCBattleCourseMaster: NPCBattleCourseContainer = {
  /** @override */
  find(armdozerId: ArmDozerId, difficulty: NPCBattleCourseDifficulty) {
    if (armdozerId === ArmDozerIdList.SHIN_BRAVER && difficulty === 'Easy') {
      return ShinBraverEasyCourse;
    }

    if (armdozerId === ArmDozerIdList.SHIN_BRAVER && difficulty === 'Normal') {
      return ShinBraverNormalCourse;
    }

    if (armdozerId === ArmDozerIdList.NEO_LANDOZER && difficulty === 'Easy') {
      return NeoLandozerEasyCourse;
    }

    if (armdozerId === ArmDozerIdList.NEO_LANDOZER && difficulty === 'Normal') {
      return NeoLandozerNormalCourse;
    }

    if (armdozerId === ArmDozerIdList.LIGHTNING_DOZER && difficulty === 'Easy') {
      return LightningDozerEasyCourse;
    }

    if (armdozerId === ArmDozerIdList.LIGHTNING_DOZER && difficulty === 'Normal') {
      return LightningDozerNormalCourse;
    }

    if (armdozerId === ArmDozerIdList.WING_DOZER && difficulty === 'Easy') {
      return WingDozerEasyCourse;
    }

    if (armdozerId === ArmDozerIdList.WING_DOZER && difficulty === 'Normal') {
      return WingDozerNormalCourse;
    }

    return ShinBraverEasyCourse;
  }
}