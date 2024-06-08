import { DifficultyDialog } from "../../../../dom-dialogs/difficulty";
import { difficultyDialogConnector } from "../../../action-connector/difficulty-dialog-connector";
import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";

/**
 * 条件を満たした場合、難易度選択を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 難易度選択を開始したか否か、trueで開始した
 */
export async function startDifficultySelectionIfNeeded(
  props: GameProps,
  action: SelectionComplete,
): Promise<boolean> {
  if (props.inProgress.type !== "NPCBattle") {
    return false;
  }

  props.inProgress = {
    ...props.inProgress,
    npcBattle: { ...action, type: "DifficultySelect" },
  };
  props.domDialogBinder.bind(
    new DifficultyDialog(props),
    difficultyDialogConnector(props),
  );
  return true;
}
