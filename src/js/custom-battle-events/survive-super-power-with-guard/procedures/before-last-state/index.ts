import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../../invisible-shout-message-window";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { attack5AndWeWin } from "../../stories/attack5-and-we-win";
import { introduction } from "../../stories/introduction";
import { shouldPlayAttack5AndWeWin } from "./should-play-attack5-and-we-win";
import { shouldPlayIntroduction } from "./should-play-introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<
    LastState & SurviveSuperPowerWithGuardProps & LastStateConditionContainer
  >,
): Promise<SurviveSuperPowerWithGuardState> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  let updatedState = props.state;
  if (shouldPlayIntroduction(props)) {
    await introduction(props);
    updatedState = { ...updatedState, isIntroductionComplete: true };
  } else if (shouldPlayAttack5AndWeWin(props)) {
    await attack5AndWeWin(props);
    updatedState = { ...updatedState, isAttack5AndWeWinComplete: true };
  }

  return updatedState;
}
