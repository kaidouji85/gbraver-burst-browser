// @flow
import {WingDozerNPC} from "../../npc/wing-dozer";
import {StrongNeoLandozerNPC} from "../../npc/strong-neo-landozer";
import type {ArmDozerId} from 'gbraver-burst-core';
import {ArmDozerIdList} from "gbraver-burst-core";
import {attack3Defense2LightningDozerNPC, attack3Defense2ShinBraverNPC} from "../../npc/attack-3-defense-2";
import {oneBatteryNeoLandozerNPC, oneBatteryShinBraverNPC} from "../../npc/one-battery";
import {maxBatteryAttackShinBraverNPC, maxBatteryAttackWingDozerNPC} from "../../npc/max-battery-attack";
import {StrongLightningDozerNPC} from "../../npc/strong-lightning-dozer";
import {NeoLandozerNPC} from "../../npc/neo-landozer";
import type {NPCBattleCourse, NPCBattleCourseContainer} from "./npc-battle-course";
import {SimpleNPCBattleCourse} from "./simple-npc-battle-course";
import type {NPCBattleStage} from "./npc-battle-stage";

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

/** シンブレイバー NPCバトルコース */
const ShinBraverNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackWingDozerStage,
  Attack3Defense2LightningDozerStage,
  {
    caption: ['音速の騎士', 'ウィングドーザ襲来'],
    npc: new WingDozerNPC(),
  },
  {
    caption: ['不屈の守護神、その名は', 'ライトニングドーザ'],
    npc: new StrongLightningDozerNPC(),
  },
]);

/** ネオランドーザ NPCバトルコース */
const NeoLandozerNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryShinBraverStage,
  MaxAttackWingDozerStage,
  Attack3Defense2LightningDozerStage,
  {
    caption: ['音速の騎士', 'ウィングドーザ襲来'],
    npc: new WingDozerNPC(),
  },
  {
    caption: ['不屈の守護神、その名は', 'ライトニングドーザ'],
    npc: new StrongLightningDozerNPC(),
  },
]);

/** ライトニングドーザ NPCバトルコース */
const LightningDozerNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackWingDozerStage,
  Attack3Defense2ShinBraverStage,
  {
    caption: ['音速の騎士', 'ウィングドーザ襲来'],
    npc: new WingDozerNPC(),
  },
  {
    caption: ['最強の破壊神、', 'ネオランドーザ爆誕'],
    npc: new StrongNeoLandozerNPC(),
  },
]);

/** ウィングドーザ NPCバトルコース */
const WingDozerNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  MaxAttackShinBraverStage,
  Attack3Defense2LightningDozerStage,

  {
    caption: ['最強の破壊神、', 'ネオランドーザ爆誕'],
    npc: new NeoLandozerNPC(),
  },
  {
    caption: ['不屈の守護神、その名は', 'ライトニングドーザ'],
    npc: new StrongLightningDozerNPC(),
  }
]);

/** NPCバトルコースマスタ */
export const NPCBattleCourseMaster: NPCBattleCourseContainer = {
  /** @override */
  find(armdozerId: ArmDozerId) {
    if (armdozerId === ArmDozerIdList.SHIN_BRAVER) {
      return ShinBraverNPCCourse;
    }

    if (armdozerId === ArmDozerIdList.NEO_LANDOZER) {
      return NeoLandozerNPCCourse;
    }

    if (armdozerId === ArmDozerIdList.LIGHTNING_DOZER) {
      return LightningDozerNPCCourse;
    }

    if (armdozerId === ArmDozerIdList.WING_DOZER) {
      return WingDozerNPCCourse;
    }

    return ShinBraverNPCCourse;
  }
}