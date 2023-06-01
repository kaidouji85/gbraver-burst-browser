import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { PilotSkillTutorial02State } from "../state";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial02State>
): Promise<PilotSkillTutorial02State> {
  return state;
}