import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { introduction } from "../../stories/introduction";
import { executeDamageRaceIfNeeded } from "./execute-damage-race-if-needed";
import { executeSelfInitiatedBurstIfNeeded } from "./execute-self-initiated-burst-if-needed";
import { executeZeroBatteryChanceIfNeeded } from "./execute-zero-battery-chance-if-needed";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  const hasGameEnd = props.update.some(
    (state) => state.effect.name === "GameEnd",
  );
  if (hasGameEnd) {
    return props.state;
  }

  if (!props.state.isIntroductionComplete) {
    await introduction(props);
    return { ...props.state, isIntroductionComplete: true };
  }

  const executors = [
    executeSelfInitiatedBurstIfNeeded,
    executeDamageRaceIfNeeded,
    executeZeroBatteryChanceIfNeeded,
  ];
  return await executors.reduce(async (acc, executor) => {
    const state = await acc;
    return await executor({ ...props, state });
  }, Promise.resolve(props.state));
}
