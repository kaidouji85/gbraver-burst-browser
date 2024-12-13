import { DifficultySelectionCancel } from "../../game-actions/difficulty-selection-cancel";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: DifficultySelectionCancel;
};

/**
 * 難易度選択キャンセル時のイベント
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 */
export function onDifficultySelectionCancel(options: Options): void {
  const { props } = options;
  if (
    props.inProgress.type === "NPCBattle" &&
    props.inProgress.npcBattle.type === "DifficultySelect"
  ) {
    props.inProgress = {
      ...props.inProgress,
      npcBattle: { type: "PlayerSelect" },
    };
    props.domDialogBinder.hidden();
  }
}
