import { StateUpdateStartedEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { QueenOfTragedyProps } from "../../props";
import { QueenOfTragedyState } from "../../state";
import { createConditions } from "./create-conditions";
import { isTraumaOfLastYearStart } from "./is-trauma-of-last-year-start";

/**
 * ステート更新が開始された時に呼ばれるイベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export function onStateUpdateStarted(
  props: StateUpdateStartedEventProps & QueenOfTragedyProps,
): QueenOfTragedyState {
  let result: QueenOfTragedyState = props.eventState;
  const conditions = createConditions(props);

  if (isTraumaOfLastYearStart(conditions)) {
    result = { ...result, chapter: { type: "TraumaOfLastYear" } };
  }

  return result;
}
