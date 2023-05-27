import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { PilotSkillTutorial01State } from "../state";
import { playerLose } from "../stories/player-lose";

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial01State>
): Promise<PilotSkillTutorial01State> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");
  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return state;
  }

  await playerLose(props);
  invisibleAllMessageWindows(props);
  return state;
}
