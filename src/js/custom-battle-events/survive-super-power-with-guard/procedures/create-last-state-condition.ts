import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
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
  return { turn };
}
