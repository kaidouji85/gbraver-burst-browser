import { QueenOfTragedyState } from "../../state";
import { Conditions } from "./conditions";

/**
 * 間違いを繰り返さないを再生するべきか判定する
 * @param latestEventState 最新のイベントステート
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export const shouldPlayNotRepeatMistake = (
  latestEventState: QueenOfTragedyState,
  conditions: Conditions,
): boolean =>
  conditions.turn === 3 &&
  !latestEventState.isStoryOfTurn3Complete &&
  conditions.enemy.armdozer.hp <= 100;
