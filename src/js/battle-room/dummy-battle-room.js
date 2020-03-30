// @flow

import type {BattleRoom} from "./battle-room";
import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core";
import type {NPC} from "../npc/npc";
import {OfflineBattleRoom} from "./offline-battle-room";
import {LightningDozerNPC} from "../npc/lightning-dozer";
import {NeoLandozerNpc} from "../npc/neo-landozer-npc";

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
  const npc: NPC = NeoLandozerNpc;
  //onst npc: NPC = LightningDozerNPC;
  return new OfflineBattleRoom(player, npc);
}