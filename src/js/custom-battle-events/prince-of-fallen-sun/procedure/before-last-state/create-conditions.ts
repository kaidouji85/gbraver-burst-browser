import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { PrinceOfFallenSunProps } from "../../props";
import { Conditions } from "./conditions";

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件オブジェクト
 */
export function createConditions(
  props: LastStateEventProps & PrinceOfFallenSunProps,
): Conditions {
  const turn = turnCount(props.stateHistory);
  const { isRetry } = props;
  return { turn, isRetry };
}
