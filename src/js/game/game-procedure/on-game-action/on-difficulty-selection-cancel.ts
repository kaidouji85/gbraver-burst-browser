import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * 難易度選択キャンセル時のイベント
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 */
function onDifficultySelectionCancel(props: GameProps): void {
  if (
    !(
      props.inProgress.type === "NPCBattle" &&
      props.inProgress.npcBattle.type === "DifficultySelect"
    )
  ) {
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    npcBattle: {
      type: "PlayerSelect",
    },
  };
  props.domDialogBinder.hidden();
}

/** アクションタイプ */
const actionType = "DifficultySelectionCancel";

/** 難易度選択キャンセル時のイベントリスナーコンテナ */
export const difficultySelectionCancelContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onDifficultySelectionCancel(props);
  },
};
