import { PrinceOfFallenSunState } from "../../state";
import { Conditions } from "./conditions";

/**
 * 御曹司を再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export const shouldPlaySunOfNoble = (
  latestEventState: PrinceOfFallenSunState,
  conditions: Conditions,
) => conditions.turn === 3 && !latestEventState.isSunOfNoblePlay;
