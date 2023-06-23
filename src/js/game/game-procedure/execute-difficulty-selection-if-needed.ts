import {GameProps} from "../game-props";
import {SelectionComplete} from "../game-actions/selection-complete";
import {DifficultyDialog} from "../../dom-dialogs/difficulty";
import {difficultyDialogConnector} from "../action-connector/difficulty-dialog-connector";

/**
 * 条件を満たした場合、難易度選択を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 難易度選択を実行したか否か、trueで実行した
 */
export async function executeDifficultySelectionIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>
): Promise<boolean> {
  if (props.inProgress.type !== "NPCBattle") {
    return false;
  }

  props.inProgress.npcBattle = {
    type: "DifficultySelect",
    armdozerId: action.armdozerId,
    pilotId: action.pilotId,
  };
  props.domDialogBinder.bind(
    new DifficultyDialog(props.resources),
    difficultyDialogConnector
  );
  return true;
}
