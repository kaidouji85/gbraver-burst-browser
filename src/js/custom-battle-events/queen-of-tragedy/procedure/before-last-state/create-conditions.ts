import { GameEnd } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { separatePlayersFromLastState } from "../../../separate-players";
import { turnCount } from "../../../turn-count";
import { QueenOfTragedyProps } from "../../props";
import { Conditions } from "./conditions";

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件オブジェクト、生成できない場合はnull
 */
export function createConditions(
  props: LastState & QueenOfTragedyProps,
): Conditions | null {
  const separatedPlayers = separatePlayersFromLastState(props);
  const turn = turnCount(props.stateHistory);
  const foundGameEnd = props.stateHistory
    .map((s) => s.effect)
    .find((e) => e.name === "GameEnd");
  const gameEnd: GameEnd | null =
    foundGameEnd && foundGameEnd.name === "GameEnd" ? foundGameEnd : null;
  return separatedPlayers ? { ...separatedPlayers, turn, gameEnd } : null;
}
