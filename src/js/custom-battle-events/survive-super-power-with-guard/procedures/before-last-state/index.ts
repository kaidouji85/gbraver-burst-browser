import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { introduction } from "../../stories/introduction";
import { shouldPlayIntroduction } from "./should-play-introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
): Promise<SurviveSuperPowerWithGuardState> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  let updatedState = props.state;
  if (shouldPlayIntroduction(props)) {
    await introduction(props);
    updatedState = { ...updatedState, isIntroductionComplete: true };
  }

  return updatedState;
}
