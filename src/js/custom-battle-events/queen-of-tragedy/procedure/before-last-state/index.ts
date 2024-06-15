import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { QueenOfTragedyProps } from "../../props";
import { QueenOfTragedyState } from "../../state";
import { introduction } from "../../stories/introduction";
import { notRepeatMistake } from "../../stories/not-repeat-mistake";
import { startOfTurn3 } from "../../stories/start-of-turn3";
import { Conditions } from "./conditions";
import { createConditions } from "./create-conditions";

/**
 * イントロダクションを再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
const shouldPlayIntroduction = (
  latestEventState: QueenOfTragedyState,
  conditions: Conditions,
): boolean => conditions.turn === 1 && !latestEventState.isIntroductionComplete;

/**
 * 間違いを繰り返さないを再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
const shouldPlayNotRepeatMistake = (
  latestEventState: QueenOfTragedyState,
  conditions: Conditions,
): boolean =>
  conditions.turn === 3 &&
  !latestEventState.isStoryOfTurn3Complete &&
  conditions.enemy.armdozer.hp <= 100;

/**
 * ターン3の開始を再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 */
const shouldPlayStartOfTurn3 = (
  latestEventState: QueenOfTragedyState,
  conditions: Conditions,
): boolean => conditions.turn === 3 && !latestEventState.isStoryOfTurn3Complete;

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
