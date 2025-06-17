import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { turnCount } from "../../../turn-count";
import { PilotSkillTutorial02Props } from "../../props";
import { PilotSkillTutorial02State } from "../../state";
import { introduction } from "../../stories/introduction";
import { executeShouldAttack3OrMoreIfNeeded } from "../on-battery-command-selected/execute-should-attack3-or-more-if-needed";
import { executeDoPilotSkillIfNeeded } from "./execute-do-pilot-skill-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastStateEventProps & PilotSkillTutorial02Props>,
): Promise<PilotSkillTutorial02State> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  const turn = turnCount(props.stateHistory);
  if (
    turn === 1 &&
    !props.eventState.isIntroductionComplete &&
    !props.isRetry
  ) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...props.eventState, isIntroductionComplete: true };
  }

  if (await executeDoPilotSkillIfNeeded(props)) {
    return { ...props.eventState, isDoPilotSkillComplete: true };
  }

  if (await executeShouldAttack3OrMoreIfNeeded(props)) {
    return { ...props.eventState, isShouldAttack3OrMoreComplete: true };
  }

  return props.eventState;
}
