// @flow

import type {NPC} from "../../../npc/npc";
import {NeoLandozerNPC} from "../../../npc/neo-landozer";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import {WingDozerNPC} from "../../../npc/wing-dozer";
import {StrongNeoLandozerNPC} from "../../../npc/strong-neo-landozer";
import {StrongLightningDozerNPC} from "../../../npc/strong-lightning-dozer";
import {oneBatteryNeoLandozerNPC, oneBatteryShinBraverNPC} from "../../../npc/one-battery";
import {maxBatteryAttackShinBraverNPC, maxBatteryAttackWingDozerNPC} from "../../../npc/max-battery-attack";
import {attack3Defense2LightningDozerNPC, attack3Defense2ShinBraverNPC} from "../../../npc/attack-3-defense-2";

/**
 * ステージレベル
 * 1から始まり+1間隔で増える
 */
export type StageLevel = number

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  caption: string[],
  /** 対戦相手 */
  npc: NPC
};

/** NPCバトルコース */
export interface NPCBattleCourse {
  /**
   * 指定したステージを取得する
   * 
   * @param level ステージレベル
   * @return ステージ
   */
  stage(level: StageLevel): NPCBattleStage;

  /**
   * ラストステージのレベルを返す
   * 
   * @return ラストステージのレベル
   */
  lastStageLevel(): StageLevel;
}

/** NPCバトルコースのシンプルな実装 */
export class SimpleNPCBattleCourse implements NPCBattleCourse {
  _stages: NPCBattleStage[];

  /**
   * コンストラクタ
   * 
   * @param stages コースに含まれる全ステージ 
   */
  constructor(stages: NPCBattleStage[]) {
    this._stages = stages;
  }

  /** @override */
  stage(level: StageLevel): NPCBattleStage {
    return this._stages[level - 1] ?? DefaultStage;
  }

  /** @override */
  lastStageLevel(): StageLevel {
    return this._stages.length;
  }
}

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: new NeoLandozerNPC()
};

/** 1バッテリー ネオランドーザ */
const OneBatteryNeoLandozerStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: oneBatteryNeoLandozerNPC()
};

/** 1バッテリー シンブレイバー */
const OneBatteryShinBraverStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: oneBatteryShinBraverNPC(),
};

/** 全力攻撃 ウィングドーザ */
const maxAttackWingDozerStage: NPCBattleStage = {
  caption: ['0防御は', '即死'],
  npc: maxBatteryAttackWingDozerNPC()
};

/** 全力攻撃 シンブレイバー */
const maxAttackShinBraverStage: NPCBattleStage = {
  caption: ['0防御は', '即死'],
  npc: maxBatteryAttackShinBraverNPC()
};

/** 3攻撃2防御 ライトングドーザ */
const attack3Defense2LightningDozerStage: NPCBattleStage = {
  caption: ['相手のバッテリー', '切れを狙え'],
  npc: attack3Defense2LightningDozerNPC()
};

/** 3攻撃2防御 シンブレイバー */
const attack3Defense2ShinBraverStage: NPCBattleStage = {
  caption: ['相手のバッテリー', '切れを狙え'],
  npc: attack3Defense2ShinBraverNPC()
};

/** シンブレイバー NPCバトルコース */
const ShinBraverNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  OneBatteryNeoLandozerStage,
  maxAttackWingDozerStage,
  attack3Defense2LightningDozerStage,
  {
    caption: ['音速の騎士','ウィングドーザ襲来'],
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
  maxAttackWingDozerStage,
  attack3Defense2LightningDozerStage,
  {
    caption: ['音速の騎士','ウィングドーザ襲来'],
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
  maxAttackWingDozerStage,
  attack3Defense2ShinBraverStage,
  {
    caption: ['音速の騎士','ウィングドーザ襲来'],
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
  maxAttackShinBraverStage,
  attack3Defense2LightningDozerStage,

  {
    caption: ['最強の破壊神、', 'ネオランドーザ爆誕'],
    npc: new NeoLandozerNPC(),
  },
  {
    caption: ['不屈の守護神、その名は', 'ライトニングドーザ'],
    npc: new StrongLightningDozerNPC(),
  }
]);

/**
 * アームドーザIDに対応したNPCバトルコースを取得する
 * 
 * @param armdozerId アームドーザID 
 * @return NPCバトルコース
 */
export function getNPCBattleCourse(armdozerId: ArmDozerId): NPCBattleCourse {
  switch(armdozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return ShinBraverNPCCourse;
    case ArmDozerIdList.NEO_LANDOZER:
      return NeoLandozerNPCCourse;
    case ArmDozerIdList.LIGHTNING_DOZER:
      return LightningDozerNPCCourse;
    case ArmDozerIdList.WING_DOZER:
      return WingDozerNPCCourse;
    default:
      return ShinBraverNPCCourse;    
  }
}