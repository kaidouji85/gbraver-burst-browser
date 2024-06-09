import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../invisible-shout-message-window";
import { separatePlayers } from "../../separate-players";
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
  let updated: QueenOfTragedyState = props.state;

  const { stateHistory } = props;
  const lastState = stateHistory.at(-1);
  const separatedPlayers = lastState ? separatePlayers(props, lastState) : null;
  if (!separatedPlayers) {
    return updated;
  }

  const { player, enemy } = separatedPlayers;
  const turn = turnCount(props.stateHistory);

  if (turn === 1 && !updated.isIntroductionComplete) {
    await introduction(props);
    updated = { ...updated, isIntroductionComplete: true };
  } else if (
    turn === 2 &&
    updated.chapter.type === "None" &&
    player.armdozer.battery === 8
  ) {
    updated = { ...updated, chapter: { type: "TraumaOfLastYear" } };
  } else if (
    turn === 3 &&
    enemy.armdozer.hp <= 100 &&
    !updated.isNotRepeatMistakeComplete
  ) {
    await notRepeatMistake(props);
    updated = { ...updated, isNotRepeatMistakeComplete: true };
  }

  return updated;
}
