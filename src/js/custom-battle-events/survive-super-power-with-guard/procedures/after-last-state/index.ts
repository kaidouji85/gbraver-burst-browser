import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { firstTurnLose } from "../../stories/first-turn-lose";
import { shouldPlayFirstTurnLose } from "./should-play-first-turn-lose";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  if (shouldPlayFirstTurnLose(props)) {
    await firstTurnLose(props);
  }
}
