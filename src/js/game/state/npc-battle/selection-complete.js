// @flow

import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";
import type {NPCBattle} from "./npc-battle";
import {ArmDozers} from "gbraver-burst-core";
import type {SelectionComplete} from "../../../action/game/selection-complete";
import {playerUuid} from "../../../uuid/player";
import type {Player} from "gbraver-burst-core";

/**
 * プレイヤーキャラ選択内容の結果をNPC戦闘に反映させる
 *
 * @param origin 変更前の状態
 * @param action アクション
 * @return 更新結果
 */
export function selectionComplete(origin: NPCBattle, action: SelectionComplete): NPCBattle {
  const armdozer = ArmDozers.find(v => v.id === action.armdozerId) ?? ArmDozers[0];
  const player: Player = {
    playerId: playerUuid(),
    armdozer: armdozer
  };
  return {
    ...origin,
    player: player
  };

}