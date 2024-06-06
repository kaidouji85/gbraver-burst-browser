import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { QueenOfTragedyProps } from "../props";
import { QueenOfTragedyState } from "../state";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: LastState & QueenOfTragedyProps,
): Promise<QueenOfTragedyState> {
  return props.state;
}
