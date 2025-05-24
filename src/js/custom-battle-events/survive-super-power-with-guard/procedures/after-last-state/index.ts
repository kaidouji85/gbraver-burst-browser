import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { thirdTurnLose } from "../../stories/third-turn-lose";
import { shouldPlayThirdTurnLose } from "./should-play-third-turn-lose";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: Readonly<
    LastState & SurviveSuperPowerWithGuardProps & LastStateConditionContainer
  >,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);

  if (shouldPlayThirdTurnLose(props)) {
    await thirdTurnLose(props);
  }
}
