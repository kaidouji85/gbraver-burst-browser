import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { separatePlayersFromLastState } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { LastStateCondition } from "../last-state-condition";

/**
 * LastStateConditionを生成する
 * @param props イベントプロパティ
 * @returns LastStateCondition
 */
export function createLastStateCondition(
  props: LastStateEventProps,
): LastStateCondition {
  const turn = turnCount(props.stateHistory);
  const separatedPlayers = separatePlayersFromLastState(props);
  const player = separatedPlayers?.player ?? props.lastState.players[0];
  const enemy = separatedPlayers?.enemy ?? props.lastState.players[1];
  return { turn, player, enemy };
}
