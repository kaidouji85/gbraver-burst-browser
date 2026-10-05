import { QueenOfTragedyState } from "../../state";
import { Conditions } from "./conditions";

/**
 * イントロダクションを再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export const shouldPlayIntroduction = (
  latestEventState: QueenOfTragedyState,
  conditions: Conditions,
): boolean =>
  conditions.turn === 1 &&
  !latestEventState.isIntroductionComplete &&
  !conditions.isRetry;
