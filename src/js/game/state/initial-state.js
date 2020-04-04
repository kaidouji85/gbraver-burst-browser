// @flow

import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core";
import type {Player} from "gbraver-burst-core";
import type {State} from "./state";
import {playerUuid} from "../../uuid/player";

/**
 * 初期ステータスを生成する
 *
 * @return {{level: number, player: Player}}
 */
export function createInitialState(): State {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0];
  const player: Player = {
    playerId: playerUuid(),
    armdozer: armdozer
  };

  return {
    player: player,
    level: 1,
  };
}