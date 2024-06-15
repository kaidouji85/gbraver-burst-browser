import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { QueenOfTragedyState } from "../../state";
import { introduction } from "../../stories/introduction";
import { notRepeatMistake } from "../../stories/not-repeat-mistake";
import { startOfTurn3 } from "../../stories/start-of-turn3";
import { createConditions } from "./create-conditions";

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
  const conditions = createConditions(props);
  if (!conditions) {
    return result;
  }

  const { turn, enemy } = conditions;
  if (turn === 1 && !result.isIntroductionComplete) {
    await introduction(props);
    result = { ...result, isIntroductionComplete: true };
  } else if (
    turn === 3 &&
    !result.isStoryOfTurn3Complete &&
    enemy.armdozer.hp <= 100
  ) {
    await notRepeatMistake(props);
    const chapter = { type: "None" } as const;
    result = { ...result, isStoryOfTurn3Complete: true, chapter };
  } else if (turn === 3 && !result.isStoryOfTurn3Complete) {
    await startOfTurn3(props);
    const chapter = { type: "None" } as const;
    result = { ...result, isStoryOfTurn3Complete: true, chapter };
  }

  return result;
}
