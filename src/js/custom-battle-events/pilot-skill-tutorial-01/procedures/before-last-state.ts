import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial01Props } from "../props";
import { PilotSkillTutorial01State } from "../state";
import { gaiInspecting } from "../stories/gai-inspectiong";
import { introduction } from "../stories/introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & PilotSkillTutorial01Props>,
): Promise<PilotSkillTutorial01State> {
  const turn = turnCount(props.stateHistory);
  if (turn === 1 && !props.state.isIntroductionComplete) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...props.state, isIntroductionComplete: true };
  }

  if (turn === 3 && !props.state.isGaiInspectingComplete) {
    await gaiInspecting(props);
    invisibleAllMessageWindows(props);
    return { ...props.state, isGaiInspectingComplete: true };
  }

  return props.state;
}
