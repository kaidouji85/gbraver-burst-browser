import { QueenOfTragedyState } from "../../state";
import { Conditions } from "./conditions";

/**
 * ターン3の開始を再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 */
export const shouldPlayStartOfTurn3 = (
  latestEventState: QueenOfTragedyState,
  conditions: Conditions,
): boolean => conditions.turn === 3 && !latestEventState.isStoryOfTurn3Complete;
