import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { PrinceOfFallenSunProps } from "../../props";

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件オブジェクト
 */
export function createConditions(props: LastState & PrinceOfFallenSunProps) {
  const turn = turnCount(props.stateHistory);
  return { turn };
}
