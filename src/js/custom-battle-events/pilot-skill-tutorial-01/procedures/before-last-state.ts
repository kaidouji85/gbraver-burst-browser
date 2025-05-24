import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../invisible-shout-message-window";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial01Props } from "../props";
import { PilotSkillTutorial01State } from "../state";
import { gaiInspecting } from "../stories/gai-inspectiong";
import { introduction } from "../stories/introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastStateEventProps & PilotSkillTutorial01Props>,
): Promise<PilotSkillTutorial01State> {
  invisibleShoutMessageWindowWhenInputCommand(props);
  const turn = turnCount(props.stateHistory);
  if (turn === 1 && !props.eventState.isIntroductionComplete) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...props.eventState, isIntroductionComplete: true };
  }

  if (turn === 3 && !props.eventState.isGaiInspectingComplete) {
    await gaiInspecting(props);
    invisibleAllMessageWindows(props);
    return { ...props.eventState, isGaiInspectingComplete: true };
  }

  return props.eventState;
}
