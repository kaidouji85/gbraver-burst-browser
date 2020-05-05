// @flow

import type {State} from "./state";
import type {BattleRoom} from "../../battle-room/battle-room";
import type {NPC} from "../../npc/npc";
import {LightningDozerNPC} from "../../npc/lightning-dozer";
import {OfflineBattleRoom} from "../../battle-room/offline-battle-room";
import {NeoLandozerNPC} from "../../npc/neo-landozer-npc";
import {StrongNeoLandozerNPC} from "../../npc/strong-neo-landozer";
import {ShinBraverNPC} from "../../npc/shin-braver";
import {ArmdozerAppearances} from "gbraver-burst-core/lib/master/armdozers";

/**
 * ゲーム状態に応じたバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return バトルルーム
 */
export function createBattleRoom(state: State): BattleRoom {
  switch (state.player.armdozer.appearance) {
    case ArmdozerAppearances.SHIN_BRAVER:
      return shinBraverRoute(state);
    case ArmdozerAppearances.NEO_LANDOZER:
      return neoLandozerRoute(state);
    default:
      return shinBraverRoute(state);
  }
}

function shinBraverRoute(state: State): BattleRoom {
  switch (state.level) {
    case 1:
      return createNeoLandozerRoom(state);
    case 2:
      return createLightningDozerRoom(state);
    case 3:
    default:
      return createStrongNeoLandozerRoom(state);
  }
}

function neoLandozerRoute(state: State): BattleRoom {
  switch (state.level) {
    case 1:
      return createShinBraverRoom(state);
    case 2:
      return createLightningDozerRoom(state);
    case 3:
    default:
      return createShinBraverRoom(state);
  }
}

function createShinBraverRoom(state: State): BattleRoom {
  const npc: NPC = new ShinBraverNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * ネオランドーザバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function createNeoLandozerRoom(state: State): BattleRoom {
  const npc: NPC = new NeoLandozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * 強いネオランドーザのバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function createStrongNeoLandozerRoom(state: State): BattleRoom {
  const npc: NPC = new StrongNeoLandozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}

/**
 * ライトニングドーザバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function createLightningDozerRoom(state: State): BattleRoom {
  const npc: NPC = new LightningDozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}