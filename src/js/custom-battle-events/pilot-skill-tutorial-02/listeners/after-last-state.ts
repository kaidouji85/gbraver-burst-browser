import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { PilotSkillTutorial02State } from "../state";
import { playerWin } from "../stories/player-win";
import {PilotSkillTutorial02Props} from "../props";

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<PilotSkillTutorial02State> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");
  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return props.state;
  }

  if (
    foundGameEnd.effect.result.type === "GameOver" &&
    foundGameEnd.effect.result.winner === props.playerId
  ) {
    await playerWin(props);
    invisibleAllMessageWindows(props);
    return props.state;
  }

  return props.state;
}
