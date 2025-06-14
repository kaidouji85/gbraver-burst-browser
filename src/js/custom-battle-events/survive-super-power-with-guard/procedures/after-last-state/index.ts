import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { secondTurnLose } from "../../stories/second-turn-lose";
import { shouldPlaySecondTurnLose } from "./should-play-second-turn-lose";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  if (shouldPlaySecondTurnLose(props)) {
    await secondTurnLose(props);
  }
}
