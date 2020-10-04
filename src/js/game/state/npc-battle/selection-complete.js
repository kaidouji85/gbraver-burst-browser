// @flow

import type {NPCBattle} from "./npc-battle";
import type {Player} from "gbraver-burst-core";
import {ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import {playerUuid} from "../../../uuid/player";
import type {SelectionComplete} from "../../actions/actions";

/**
 * プレイヤーキャラ選択内容の結果をNPC戦闘に反映させる
 *
 * @param origin 変更前の状態
 * @param action アクション
 * @return 更新結果
 */
export function selectionComplete(origin: NPCBattle, action: SelectionComplete): NPCBattle {
  const armdozer = ArmDozers.find(v => v.id === action.armdozerId) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];  // TODO 画面から渡されたIDを使うようにする
  const player: Player = {
    playerId: playerUuid(),
    armdozer: armdozer,
    pilot: pilot
  };
  return {
    ...origin,
    player: player
  };

}