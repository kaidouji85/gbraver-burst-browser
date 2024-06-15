import { StateUpdateStarted } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { QueenOfTragedyProps } from "../../props";
import { Conditions } from "./conditions";

/**
 * 条件判断オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件判断オブジェクト
 */
export function createConditions(
  props: StateUpdateStarted & QueenOfTragedyProps,
): Conditions {
  const { stateHistory, update, playerId } = props;
  const turn = turnCount(stateHistory);
  const willPlayerBurst = update.some(
    (s) => s.effect.name === "BurstEffect" && s.effect.burstPlayer === playerId,
  );
  return { turn, willPlayerBurst };
}
