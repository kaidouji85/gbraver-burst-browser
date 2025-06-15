import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { introduction } from "../../stories/introduction";
import { surviveSecondTurnWithEvade } from "../../stories/survive-second-turn-with-evade";
import { surviveSecondTurnWithGuard } from "../../stories/survive-second-turn-with-guard";
import { shouldPlayIntroduction } from "./should-play-introduction";
import { shouldPlaySurviveSecondTurnWithEvade } from "./should-play-survive-second-turn-with-evade";
import { shouldPlaySurviveSecondTurnWithGuard } from "./should-play-survive-second-turn-with-guard";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
): Promise<SurviveSuperPowerWithGuardState> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  let updatedState = props.state;
  if (shouldPlayIntroduction(props)) {
    await introduction(props);
    updatedState = { ...updatedState, isIntroductionComplete: true };
  } else if (shouldPlaySurviveSecondTurnWithGuard(props)) {
    await surviveSecondTurnWithGuard(props);
    updatedState = { ...updatedState, isSecondTurnEventComplete: true };
  } else if (shouldPlaySurviveSecondTurnWithEvade(props)) {
    await surviveSecondTurnWithEvade(props);
    updatedState = { ...updatedState, isSecondTurnEventComplete: true };
  }

  return updatedState;
}
