import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../invisible-shout-message-window";
import { separatePlayersFromLastState } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { QueenOfTragedyProps } from "../props";
import { QueenOfTragedyState } from "../state";
import { introduction } from "../stories/introduction";
import { notRepeatMistake } from "../stories/not-repeat-mistake";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: LastState & QueenOfTragedyProps,
): Promise<QueenOfTragedyState> {
  invisibleShoutMessageWindowWhenInputCommand(props);
  let result: QueenOfTragedyState = props.eventState;

  const { stateHistory } = props;
  const separatedPlayers = separatePlayersFromLastState(props);
  if (!separatedPlayers) {
    return result;
  }

  const { enemy } = separatedPlayers;
  const turn = turnCount(stateHistory);

  if (turn === 1 && !result.isIntroductionComplete) {
    await introduction(props);
    result = { ...result, isIntroductionComplete: true };
  } else if (
    turn === 3 &&
    enemy.armdozer.hp <= 100 &&
    !result.isNotRepeatMistakeComplete
  ) {
    await notRepeatMistake(props);
    result = { ...result, isNotRepeatMistakeComplete: true };
  }

  return result;
}
