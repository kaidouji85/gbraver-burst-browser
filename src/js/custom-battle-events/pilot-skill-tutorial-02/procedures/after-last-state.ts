import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { PilotSkillTutorial02Props } from "../props";
import { PilotSkillTutorial02State } from "../state";
import { playerWin } from "../stories/player-win";

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps & PilotSkillTutorial02Props>,
): Promise<PilotSkillTutorial02State> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");
  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return props.eventState;
  }

  if (
    foundGameEnd.effect.result.type === "GameOver" &&
    foundGameEnd.effect.result.winner === props.playerId
  ) {
    await playerWin(props);
    invisibleAllMessageWindows(props);
    return props.eventState;
  }

  return props.eventState;
}
