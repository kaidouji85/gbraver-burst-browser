// @flow

import type {BattleRoom} from "./battle-room";
import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core";
import {OfflineBattleRoom} from "./offline-battle-room";
import {NeoLandozerNPC} from "../npc/neo-landozer-npc";
import {LightningDozerNPC} from "../npc/lightning-dozer";

/**
 * ダミーの戦闘ルームを生成する
 *
 * @return ダミーの戦闘ルーム
 */
export function createDummyBattleRoom(): BattleRoom {
  const player: Player = {
    playerId: 'test01',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  player.armdozer.speed = 1000; // TODO 開発が完了したら削除する
  //const npc = new NeoLandozerNPC();
  const npc = new LightningDozerNPC();
  return new OfflineBattleRoom(player, npc);
}