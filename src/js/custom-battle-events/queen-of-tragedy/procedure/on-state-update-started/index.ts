import { StateUpdateStarted } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { QueenOfTragedyProps } from "../../props";
import { QueenOfTragedyState } from "../../state";

/**
 * ステート更新が開始された時に呼ばれるイベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export function onStateUpdateStarted(
  props: StateUpdateStarted & QueenOfTragedyProps,
): QueenOfTragedyState {
  let result: QueenOfTragedyState = props.eventState;

  const { stateHistory, update, playerId } = props;
  const turn = turnCount(stateHistory);
  const willPlayerBurst = update.some(
    (s) => s.effect.name === "BurstEffect" && s.effect.burstPlayer === playerId,
  );

  if (turn === 2 && willPlayerBurst) {
    const chapter = { type: "TraumaOfLastYear" } as const;
    result = { ...result, chapter };
  }

  return result;
}
