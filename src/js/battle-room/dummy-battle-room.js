// @flow

import type {BattleRoom} from "./battle-room";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core/lib/master/armdozers";
import type {NPC} from "../npc/npc";
import {NeoLandozerNpc} from "../npc/neo-landozer-npc";
import {OfflineBattleRoom} from "./offline-battle-room";

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
  player.armdozer.speed = 100; // TODO 開発が完了したら戻す
  const npc: NPC = NeoLandozerNpc;
  return new OfflineBattleRoom(player, npc);
}