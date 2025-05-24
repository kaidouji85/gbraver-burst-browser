import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { BatterySystemTutorialProps } from "../../props";
import { BatterySystemTutorialState } from "../../state";
import { introduction } from "../../stories/introduction";
import { doBattleDescriptionIfNeeded } from "./do-battle-description-if-needed";
import { doSelfInitiatedPilotSkillIfNeeded } from "./do-self-initialated-pilot-skill-if-needed";
import { doSelfInitiatedBurstIfNeeded } from "./do-self-initiated-burst-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastStateEventProps & BatterySystemTutorialProps>,
): Promise<BatterySystemTutorialState> {
  const turn = turnCount(props.stateHistory);
  if (turn === 1) {
    await introduction(props);
    return props.eventState;
  }

  const doneBattleDescription = await doBattleDescriptionIfNeeded(props);
  if (doneBattleDescription) {
    return doneBattleDescription;
  }

  if (await doSelfInitiatedBurstIfNeeded(props)) {
    return props.eventState;
  }

  if (await doSelfInitiatedPilotSkillIfNeeded(props)) {
    return props.eventState;
  }

  return props.eventState;
}
