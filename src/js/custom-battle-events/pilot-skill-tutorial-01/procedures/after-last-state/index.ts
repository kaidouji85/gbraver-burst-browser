import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { PilotSkillTutorial01Props } from "../../props";
import { PilotSkillTutorial01State } from "../../state";
import { executePlayerLoseIfNeeded } from "./execute-player-lose-if-needed";

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState & PilotSkillTutorial01Props>,
): Promise<PilotSkillTutorial01State> {
  invisibleShoutMessageWindowWhenGameEnd(props);
  if (await executePlayerLoseIfNeeded(props)) {
    return props.state;
  }

  return props.state;
}
