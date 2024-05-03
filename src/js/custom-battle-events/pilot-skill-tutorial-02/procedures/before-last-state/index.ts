import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { turnCount } from "../../../turn-count";
import { PilotSkillTutorial02Props } from "../../props";
import { PilotSkillTutorial02State } from "../../state";
import { introduction } from "../../stories/introduction";
import { executeDoPilotSkillIfNeeded } from "./execute-do-pilot-skill-if-needed";
import { executeShouldAttack3OrMoreIfNeeded } from "../on-battery-command-selected/execute-should-attack3-or-more-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<PilotSkillTutorial02State> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  const turn = turnCount(props.stateHistory);
  if (turn === 1 && !props.state.isIntroductionComplete) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...props.state, isIntroductionComplete: true };
  }

  if (await executeDoPilotSkillIfNeeded(props)) {
    return { ...props.state, isDoPilotSkillComplete: true };
  }

  if (await executeShouldAttack3OrMoreIfNeeded(props)) {
    return { ...props.state, isShouldAttack3OrMoreComplete: true };
  }

  return props.state;
}
