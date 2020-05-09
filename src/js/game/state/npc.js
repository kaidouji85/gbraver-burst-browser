// @flow

import type {NPC} from "../../npc/npc";
import type {State} from "./state";
import type {BattleRoom} from "../../battle-room/battle-room";
import {WeakNeoLandozerNPC} from "../../npc/weak-neo-landozer-npc";
import {LightningDozerNPC} from "../../npc/lightning-dozer";
import {NeoLandozerNPC} from "../../npc/neo-landozer";
import {WeakLightningDozerNPC} from "../../npc/weak-lightning-dozer";
import {ShinBraverNPC} from "../../npc/shin-braver";
import {ArmdozerAppearances} from "gbraver-burst-core";

/**
 * 状態に応じたNPCを返す
 *
 * @param state 状態
 * @return NPC
 */
function getNPC(state: State): NPC {
  switch (state.player.armdozer.appearance) {
    case ArmdozerAppearances.SHIN_BRAVER:
      return shinBraverCourse(state.level);
    case ArmdozerAppearances.NEO_LANDOZER:
      return neoLandozerCourse(state.level);
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return lightningDozerCource(state.level);
    default:
      return shinBraverCourse(state.level);
  }
}

/**
 * シンブレイバーを選択した際のコース
 *
 * @param level レベル
 * @return 生成結果
 */
function shinBraverCourse(level: number): BattleRoom {
  switch (level) {
    case 1:
      return new WeakNeoLandozerNPC();
    case 2:
      return new LightningDozerNPC();
    case 3:
    default:
      return new NeoLandozerNPC();
  }
}

/**
 * ネオランドーザを選択した際のコース
 *
 * @param level レベル
 * @return 生成結果
 */
function neoLandozerCourse(level: number): BattleRoom {
  switch (level) {
    case 1:
      return new WeakLightningDozerNPC();
    case 2:
      return new ShinBraverNPC();
    case 3:
    default:
      return new LightningDozerNPC();
  }
}

/**
 * ライトニングドーザ を選択した際のコース
 *
 * @param level レベル
 * @return 生成結果
 */
function lightningDozerCource(level: number): BattleRoom {
  switch (level) {
    case 1:
      return new WeakNeoLandozerNPC;
    case 2:
      return new ShinBraverNPC();
    case 3:
    default:
      return new NeoLandozerNPC();
  }
}