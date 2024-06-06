import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { QueenOfTragedyProps } from "../props";
import { QueenOfTragedyState } from "../state";
import { introduction } from "../stories/introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: LastState & QueenOfTragedyProps,
): Promise<QueenOfTragedyState> {
  let updated: QueenOfTragedyState = props.state;

  const turn = turnCount(props.stateHistory);
  if (turn === 1 && !updated.isIntroductionComplete) {
    await introduction(props);
    updated = { ...updated, isIntroductionComplete: true };
  }

  return updated;
}
