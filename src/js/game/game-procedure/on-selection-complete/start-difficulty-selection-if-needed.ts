import { DifficultyDialog } from "../../../dom-dialogs/difficulty";
import { difficultyDialogConnector } from "../../action-connector/difficulty-dialog-connector";
import { SelectionComplete } from "../../game-actions/selection-complete";
import { GameProps } from "../../game-props";

/**
 * 条件を満たした場合、難易度選択を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 難易度選択を開始したか否か、trueで開始した
 */
export async function startDifficultySelectionIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>,
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
    new DifficultyDialog(props),
    difficultyDialogConnector,
  );
  return true;
}
