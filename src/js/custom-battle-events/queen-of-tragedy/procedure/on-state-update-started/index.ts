import { StateUpdateStarted } from "../../../../td-scenes/battle/custom-battle-event";
import { QueenOfTragedyProps } from "../../props";
import { QueenOfTragedyState } from "../../state";
import { createConditions } from "./create-conditions";

/**
 * ステート更新が開始された時に呼ばれるイベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export function onStateUpdateStarted(
  props: StateUpdateStarted & QueenOfTragedyProps,
): QueenOfTragedyState {
  let result: QueenOfTragedyState = props.eventState;
  const conditions = createConditions(props);
  if (!conditions) {
    return result;
  }

  if (conditions.turn === 2 && conditions.willPlayerBurst) {
    const chapter = { type: "TraumaOfLastYear" } as const;
    result = { ...result, chapter };
  }

  return result;
}
