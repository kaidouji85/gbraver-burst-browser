// @flow

import type {State} from "./state";
import type {BattleRoom} from "../../battle-room/battle-room";
import type {NPC} from "../../npc/npc";
import {LightningDozerNPC} from "../../npc/lightning-dozer";
import {OfflineBattleRoom} from "../../battle-room/offline-battle-room";
import {WeakNeoLandozerNPC} from "../../npc/weak-neo-landozer-npc";
import {NeoLandozerNPC} from "../../npc/neo-landozer";
import {WeakShinBraverNPC} from "../../npc/weak-shin-braver";
import {ArmdozerAppearances} from "gbraver-burst-core/lib/master/armdozers";
import {ShinBraverNPC} from "../../npc/shin-braver";

/**
 * ゲーム状態に応じたバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return バトルルーム
 */
export function createBattleRoom(state: State): BattleRoom {
  switch (state.player.armdozer.appearance) {
    case ArmdozerAppearances.SHIN_BRAVER:
      return shinBraverCourse(state);
    case ArmdozerAppearances.NEO_LANDOZER:
      return neoLandozerCourse(state);
    case ArmdozerAppearances.LIGHTNING_DOZER:
      return lightningDozerCource(state);
    default:
      return shinBraverCourse(state);
  }
}

/**
 * シンブレイバーを選択した際のコース
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function shinBraverCourse(state: State): BattleRoom {
  switch (state.level) {
    case 1:
      return weakNeoLandozerRoom(state);
    case 2:
      return lightningDozerRoom(state);
    case 3:
    default:
      return neoLandozerRoom(state);
  }
}

/**
 * ネオランドーザを選択した際のコース
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function neoLandozerCourse(state: State): BattleRoom {
  switch (state.level) {
    case 1:
      return weakLightningDozer(state);
    case 2:
      return shinBraverRoom(state);
    case 3:
    default:
      return lightningDozerRoom(state);
  }
}

/**
 * ライトニングドーザ を選択した際のコース
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function lightningDozerCource(state: State): BattleRoom {
  switch (state.level) {
    case 1:
      return weakNeoLandozerRoom(state);
    case 2:
      return shinBraverRoom(state);
    case 3:
    default:
      return neoLandozerRoom(state);
  }
}

/**
 * 弱いシンブレイバー ルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function weakShinBraverRoom(state: State): BattleRoom {
  const npc: NPC = new WeakShinBraverNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * シンブレイバー ルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function shinBraverRoom(state: State): BattleRoom {
  const npc: NPC = new ShinBraverNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * 弱いネオランドーザ ルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function weakNeoLandozerRoom(state: State): BattleRoom {
  const npc: NPC = new WeakNeoLandozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 *ネオランドーザ ルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function neoLandozerRoom(state: State): BattleRoom {
  const npc: NPC = new NeoLandozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * 弱いライトニングドーザルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function weakLightningDozer(state: State): BattleRoom {
  const npc: NPC = new WeakNeoLandozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * ライトニングドーザルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function lightningDozerRoom(state: State): BattleRoom {
  const npc: NPC = new LightningDozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}