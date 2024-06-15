import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { QueenOfTragedyState } from "../../state";
import { introduction } from "../../stories/introduction";
import { notRepeatMistake } from "../../stories/not-repeat-mistake";
import { startOfTurn3 } from "../../stories/start-of-turn3";
import { createConditions } from "./create-conditions";
import { shouldPlayIntroduction } from "./should-play-introduction";
import { shouldPlayNotRepeatMistake } from "./should-play-not-repeat-mistake";
import { shouldPlayStartOfTurn3 } from "./should-play-start-of-turn3";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: LastState & QueenOfTragedyProps,
): Promise<QueenOfTragedyState> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  let latestEventState: QueenOfTragedyState = props.eventState;
  const conditions = createConditions(props);
  if (!conditions) {
    return latestEventState;
  }

  if (shouldPlayIntroduction(latestEventState, conditions)) {
    await introduction(props);
    latestEventState = { ...latestEventState, isIntroductionComplete: true };
  } else if (shouldPlayNotRepeatMistake(latestEventState, conditions)) {
    await notRepeatMistake(props);
    latestEventState = {
      ...latestEventState,
      isStoryOfTurn3Complete: true,
      chapter: { type: "None" },
    };
  } else if (shouldPlayStartOfTurn3(latestEventState, conditions)) {
    await startOfTurn3(props);
    latestEventState = {
      ...latestEventState,
      isStoryOfTurn3Complete: true,
      chapter: { type: "None" },
    };
  }

  return latestEventState;
}
