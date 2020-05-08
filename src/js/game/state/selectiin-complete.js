// @flow

import type {State} from "./state";
import type {SelectionComplete} from "../../action/game/selection-complete";
import {ArmDozers} from "gbraver-burst-core";

/**
 * プレイヤー選択完了時の処理
 *
 * @param origin 変更前のステート
 * @param action アクション
 * @return 変更後のステート
 */
export function selectionComplete(origin: State, action: SelectionComplete): State {
  const armdozer = ArmDozers.find(v => v.id === action.armdozerId);
  return {
    ...origin,
    player: {
      ...origin.player,
      armdozer: armdozer ?? origin.player.armdozer
    }
  };
}