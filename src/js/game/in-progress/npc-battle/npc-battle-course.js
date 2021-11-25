// @flow

import type {NPC} from "../../../npc/npc";
import {NeoLandozerNPC} from "../../../npc/neo-landozer";
import {WeakNeoLandozerNPC} from "../../../npc/weak-neo-landozer-npc";
import {WeakShinBraverNPC} from "../../../npc/weak-shin-braver";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import {WingDozerNPC} from "../../../npc/wing-dozer";
import {StrongNeoLandozerNPC} from "../../../npc/strong-neo-landozer";
import {StrongLightningDozerNPC} from "../../../npc/strong-lightning-dozer";

/**
 * ステージレベル
 * 1から始まり+1間隔で増える
 */
export type StageLevel = number

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  stageName: string,
  /** 対戦相手 */
  npc: NPC
};

/** NPCバトルコース */
export interface NPCBattleCourse {
  /**
   * 指定したステージを取得する
   * 
   * @param level 1から始まるステージレベル
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

class SimpleNPCBattleCourse implements NPCBattleCourse {
  _stages: NPCBattleStage[];

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
  stageName: 'STAGE 0',
  npc: new NeoLandozerNPC()
};

/** シンブレイバー NPCバトルコース */
const ShinBraverNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  {
    stageName: 'STAGE 1',
    npc: new WeakNeoLandozerNPC(),
  },
  {
    stageName: 'STAGE 2',
    npc: new WingDozerNPC(),
  },
  {
    stageName: 'STAGE FINAL',
    npc: new StrongLightningDozerNPC(),
  },
]);

/** ネオランドーザ NPCバトルコース */
const NeoLandozerNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  {
    stageName: 'STAGE 1',
    npc: new WeakShinBraverNPC(),
  },
  {
    stageName: 'STAGE 2',
    npc: new WingDozerNPC(),
  },
  {
    stageName: 'STAGE FINAL',
    npc: new StrongLightningDozerNPC(),
  },
]);

/** ライトニングドーザ NPCバトルコース */
const LightningDozerNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  {
    stageName: 'STAGE 1',
    npc: new WeakShinBraverNPC(),
  },
  {
    stageName: 'STAGE 2',
    npc: new WingDozerNPC(),
  },
  {
    stageName: 'STAGE FINAL',
    npc: new StrongNeoLandozerNPC(),
  },
]);

/** ウィングドーザ NPCバトルコース */
const WingDozerNPCCourse: NPCBattleCourse = new SimpleNPCBattleCourse([
  {
    stageName: 'STAGE 1',
    npc: new WeakShinBraverNPC(),
  },
  {
    stageName: 'STAGE 2',
    npc: new NeoLandozerNPC(),
  },
  {
    stageName: 'STAGE FINAL',
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