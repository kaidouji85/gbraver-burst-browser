import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { BurstTutorialProps } from "../../props";
import { BurstTutorialState } from "../../state";
import { introduction } from "../../stories/introduction";
import { executeReflectIfNeeded } from "./execute-reflect-if-needed";
import {executeSelfInitiatedBurstIfNeeded} from "./execute-self-initiated-burst-if-needed";
import {executeSelfInitiatedPilotSkillIfNeeded} from "./execute-self-initiated-pilot-skill-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & BurstTutorialProps>,
): Promise<BurstTutorialState> {
  if (!props.state.isIntroductionComplete) {
    await introduction(props);
    return { ...props.state, isIntroductionComplete: true };
  }

  await executeSelfInitiatedBurstIfNeeded(props);
  await executeSelfInitiatedPilotSkillIfNeeded(props);
  await executeReflectIfNeeded(props);
  return props.state;
}
