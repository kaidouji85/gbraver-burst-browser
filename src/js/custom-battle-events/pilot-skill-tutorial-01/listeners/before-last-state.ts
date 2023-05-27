import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial01State } from "../state";
import { gaiInspecting } from "../stories/gai-inspectiong";
import { introduction } from "../stories/introduction";
import {declarationVictory} from "../stories/declaration-victory";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @param state チュートリアルステート
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial01State>
): Promise<PilotSkillTutorial01State> {
  const updatedStateHistory = {
    ...state,
    stateHistory: [...state.stateHistory, ...props.update],
  };

  const turn = turnCount(updatedStateHistory.stateHistory);
  if (turn === 1 && !updatedStateHistory.isIntroductionComplete) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return {...updatedStateHistory, isIntroductionComplete: true};
  }
  
  if (turn === 2 && !updatedStateHistory.isGaiInspectingComplete) {
    await gaiInspecting(props);
    invisibleAllMessageWindows(props);
    return {...updatedStateHistory, isGaiInspectingComplete: true};
  }

  if (turn === 3 && !updatedStateHistory.isDeclarationVictoryComplete) {
    await declarationVictory(props);
    invisibleAllMessageWindows(props);
    return {...updatedStateHistory, isDeclarationVictoryComplete: true};
  }
  
  return updatedStateHistory;
}