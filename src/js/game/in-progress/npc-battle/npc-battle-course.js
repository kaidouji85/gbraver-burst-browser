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

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージレベル */
  level: number,
  /** ステージ名 */
  stageName: string,
  /** 対戦相手 */
  npc: NPC
};

/** NPCバトルコース */
export type NPCBattleCource = NPCBattleStage[];

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  level: 0,
  stageName: 'STAGE 0',
  npc: new NeoLandozerNPC()
};

/** シンブレイバー NPCバトルコース */
export const ShinBraverNPCCource: NPCBattleCource = [
  {
    level: 1,
    stageName: 'STAGE 1',
    npc: new WeakNeoLandozerNPC(),
  },
  {
    level: 2,
    stageName: 'STAGE 2',
    npc: new WingDozerNPC(),
  },
  {
    level: 3,
    stageName: 'STAGE FINAL',
    npc: new StrongLightningDozerNPC(),
  },
];

/** ネオランドーザ NPCバトルコース */
export const NeoLandozerNPCCource: NPCBattleCource = [
  {
    level: 1,
    stageName: 'STAGE 1',
    npc: new WeakShinBraverNPC(),
  },
  {
    level: 2,
    stageName: 'STAGE 2',
    npc: new WingDozerNPC(),
  },
  {
    level: 3,
    stageName: 'STAGE FINAL',
    npc: new StrongLightningDozerNPC(),
  },
];

/** ライトニングドーザ NPCバトルコース */
export const LightningDozerNPCCource: NPCBattleCource = [
  {
    level: 1,
    stageName: 'STAGE 1',
    npc: new WeakShinBraverNPC(),
  },
  {
    level: 2,
    stageName: 'STAGE 2',
    npc: new WingDozerNPC(),
  },
  {
    level: 3,
    stageName: 'STAGE FINAL',
    npc: new StrongNeoLandozerNPC(),
  },
];

/** ウィングドーザ NPCバトルコース */
export const WingDozerNPCCource: NPCBattleCource = [
  {
    level: 1,
    stageName: 'STAGE 1',
    npc: new WeakShinBraverNPC(),
  },
  {
    level: 2,
    stageName: 'STAGE 2',
    npc: new NeoLandozerNPC(),
  },
  {
    level: 3,
    stageName: 'STAGE FINAL',
    npc: new StrongLightningDozerNPC(),
  },
];

/**
 * アームドーザIDに対応したNPCバトルコースを取得する
 * 
 * @param armdozerId アームドーザID 
 * @return NPCバトルコース
 */
export function getNPCBattleCourse(armdozerId: ArmDozerId): NPCBattleCource {
  switch(armdozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return ShinBraverNPCCource;
    case ArmDozerIdList.NEO_LANDOZER:
      return NeoLandozerNPCCource;
    case ArmDozerIdList.LIGHTNING_DOZER:
      return LightningDozerNPCCource;
    case ArmDozerIdList.WING_DOZER:
      return WingDozerNPCCource;
    default:
      return ShinBraverNPCCource;    
  }
}