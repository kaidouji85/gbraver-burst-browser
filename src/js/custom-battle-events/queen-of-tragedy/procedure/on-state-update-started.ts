import { StateUpdateStarted } from "../../../td-scenes/battle/custom-battle-event";
import { separatePlayersFromLastState } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { QueenOfTragedyProps } from "../props";
import { QueenOfTragedyState } from "../state";

/**
 * ステート更新が開始された時に呼ばれるイベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function onStateUpdateStarted(
  props: StateUpdateStarted & QueenOfTragedyProps,
): Promise<QueenOfTragedyState> {
  let result: QueenOfTragedyState = props.state;

  const separatedPlayers = separatePlayersFromLastState(props);
  const player = separatedPlayers?.player;
  const { stateHistory } = props;
  const turn = turnCount(stateHistory);

  if (
    turn === 2 &&
    result.chapter.type === "None" &&
    player?.armdozer.battery === 8
  ) {
    const chapter = { type: "TraumaOfLastYear", startTurn: turn } as const;
    result = { ...result, chapter };
  } else if (
    result.chapter.type === "TraumaOfLastYear" &&
    result.chapter.startTurn < turn
  ) {
    const chapter = { type: "None" } as const;
    result = { ...result, chapter };
  }

  return result;
}
