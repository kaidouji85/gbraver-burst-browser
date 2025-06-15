import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { introduction } from "../../stories/introduction";
import { surviveThirdTurnWithEvade } from "../../stories/survive-third-turn-with-evade";
import { surviveSecondTurnWithGuard } from "../../stories/survive-third-turn-with-guard";
import { shouldPlayIntroduction } from "./should-play-introduction";
import { shouldPlaySurviveThirdTurnWithEvade } from "./should-play-survive-third-turn-with-evade";
import { shouldPlaySurviveSecondTurnWithGuard } from "./should-play-survive-third-turn-with-guard";

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
    updatedState = { ...updatedState, isThirdTurnEventComplete: true };
  } else if (shouldPlaySurviveThirdTurnWithEvade(props)) {
    await surviveThirdTurnWithEvade(props);
    updatedState = { ...updatedState, isThirdTurnEventComplete: true };
  }

  return updatedState;
}
