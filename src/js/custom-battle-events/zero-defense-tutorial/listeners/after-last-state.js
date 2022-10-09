// @flow
import type {LastState} from "../../../game/td-scenes/battle/custom-battle-event";
import type {ZeroDefenseTutorialState} from "../state";

/**
 * 最終ステート完了後イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function afterLastState(props: $ReadOnly<LastState>, state: ZeroDefenseTutorialState): Promise<ZeroDefenseTutorialState> {
  return state;
}