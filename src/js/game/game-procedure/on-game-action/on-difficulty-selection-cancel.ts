import type { GameProps } from "../../game-props";

/**
 * 難易度選択キャンセル時のイベント
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 */
export function onDifficultySelectionCancel(props: GameProps): void {
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
