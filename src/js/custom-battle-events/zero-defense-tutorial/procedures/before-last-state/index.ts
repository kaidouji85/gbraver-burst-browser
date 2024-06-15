import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { introduction } from "../../stories/introduction";
import { executeDamageRaceIfNeeded } from "./execute-damage-race-if-needed";
import { executeSelfInitiatedPilotSkillIfNeeded } from "./execute-self-initialated-pilot-skill-if-needed";
import { executeSelfInitiatedBurstIfNeeded } from "./execute-self-initiated-burst-if-needed";
import { executeZeroBatteryChanceIfNeeded } from "./execute-zero-battery-chance-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  const hasGameEnd = props.update.some(
    (state) => state.effect.name === "GameEnd",
  );
  if (hasGameEnd) {
    return props.eventState;
  }

  if (!props.eventState.isIntroductionComplete) {
    await introduction(props);
    return { ...props.eventState, isIntroductionComplete: true };
  }

  const executors = [
    executeSelfInitiatedBurstIfNeeded,
    executeSelfInitiatedPilotSkillIfNeeded,
    executeDamageRaceIfNeeded,
    executeZeroBatteryChanceIfNeeded,
  ];
  return await executors.reduce(async (acc, executor) => {
    const state = await acc;
    return await executor({ ...props, eventState: state });
  }, Promise.resolve(props.eventState));
}
