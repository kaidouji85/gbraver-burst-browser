// @flow

import type {NPC} from "../../../npc/npc";
import {NeoLandozerNPC} from "../../../npc/neo-landozer";
import {WeakNeoLandozerNPC} from "../../../npc/weak-neo-landozer-npc";
import {LightningDozerNPC} from "../../../npc/lightning-dozer";
import {WeakLightningDozerNPC} from "../../../npc/weak-lightning-dozer";
import {ShinBraverNPC} from "../../../npc/shin-braver";
import {WeakShinBraverNPC} from "../../../npc/weak-shin-braver";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import {WeakWingDozerNPC} from "../../../npc/weak-wing-dozer-npc";

/**
 * NPCコース
 */
export type NPCBattleCourse = {
  /** プレイヤー アームドーザID */
  armdozerId: ArmDozerId,
  /** レベル */
  level: number,
  /** ステージ名 */
  stageName: string,
  /** 対戦相手 */
  npc: () => NPC
};

/**
 * デフォルトのステージ
 */
export const DefaultCourse: NPCBattleCourse = {
  armdozerId: ArmDozerIdList.SHIN_BRAVER,
  level: 0,
  stageName: 'STAGE 0',
  npc: () => new NeoLandozerNPC()
};

/**
 * NPCコースをあつめたもの
 */
export const NPCBattleCourses: NPCBattleCourse[] = [
  /** シンブレイバー */
  // TODO 開発が完了したら戻す
  /*
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    level: 1,
    stageName: 'STAGE 1',
    npc: () => new WeakNeoLandozerNPC(),
  },
  */
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    level: 1,
    stageName: 'STAGE 1',
    npc: () => new WeakWingDozerNPC(),
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    level: 2,
    stageName: 'STAGE 2',
    npc: () => new LightningDozerNPC(),
  },
  {
    armdozerId: ArmDozerIdList.SHIN_BRAVER,
    level: 3,
    stageName: 'STAGE FINAL',
    npc: () => new NeoLandozerNPC(),
  },
  /** ネオランドーザ */
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    level: 1,
    stageName: 'STAGE 1',
    npc: () => new WeakLightningDozerNPC(),
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    level: 2,
    stageName: 'STAGE 2',
    npc: () => new ShinBraverNPC(),
  },
  {
    armdozerId: ArmDozerIdList.NEO_LANDOZER,
    level: 3,
    stageName: 'STAGE FINAL',
    npc: () => new LightningDozerNPC(),
  },
  /** ライトニングドーザ  */
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    level: 1,
    stageName: 'STAGE 1',
    npc: () => new WeakShinBraverNPC(),
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    level: 2,
    stageName: 'STAGE 2',
    npc: () => new NeoLandozerNPC(),
  },
  {
    armdozerId: ArmDozerIdList.LIGHTNING_DOZER,
    level: 3,
    stageName: 'STAGE FINAL',
    npc: () => new ShinBraverNPC(),
  },
];