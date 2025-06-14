import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { PilotSkillTutorial01Props } from "../../props";
import { PilotSkillTutorial01State } from "../../state";
import { executePlayerLoseIfNeeded } from "./execute-player-lose-if-needed";

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastStateEventProps & PilotSkillTutorial01Props>,
): Promise<PilotSkillTutorial01State> {
  invisibleShoutMessageWindowWhenGameEnd(props);
  if (await executePlayerLoseIfNeeded(props)) {
    return props.eventState;
  }

  return props.eventState;
}
