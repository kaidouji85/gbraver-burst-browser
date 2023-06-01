import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { PilotSkillTutorial02State } from "../state";
import { playerWin } from "../stories/player-win";

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial02State>
): Promise<PilotSkillTutorial02State> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");
  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return state;
  }

  if (
    foundGameEnd.effect.result.type === "GameOver" && 
    foundGameEnd.effect.result.winner === props.playerId
  ) {
    await playerWin(props);
    invisibleAllMessageWindows(props);
    return state;  
  }
  
  return state;
}
