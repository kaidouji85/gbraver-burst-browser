import type {State} from "./state";
import type {BattleRoom} from "../../battle-room/battle-room";
import type {NPC} from "../../npc/npc";
import {LightningDozerNPC} from "../../npc/lightning-dozer";
import {OfflineBattleRoom} from "../../battle-room/offline-battle-room";
import {NeoLandozerNPC} from "../../npc/neo-landozer-npc";

/**
 * ゲーム状態に応じたバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return バトルルーム
 */
export function createBattleRoom(state: State): BattleRoom {
  switch (state.level) {
    case 1:
      return createNeoLandozerRoom(state);
    case 2:
    default:
      return createLightningDozerRoom(state);
  }
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
 * ライトニングドーザバトルルームを生成する
 *
 * @param state ゲーム状態
 * @return 生成結果
 */
function createLightningDozerRoom(state: State): BattleRoom {
  const npc: NPC = new LightningDozerNPC();
  return new OfflineBattleRoom(state.player, npc);
}