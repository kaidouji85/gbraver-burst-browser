// @flow
import type {GameProps} from "../game-props";

/**
 * 難易度選択キャンセル時のイベント
 *
 * @param props ゲームプロパティ
 */
export function onDifficultySelectionCancel(props: GameProps): void {
  if (!(props.inProgress.type === 'NPCBattle' && props.inProgress.subFlow.type === 'DifficultySelect')) {
    return;
  }

  props.inProgress = {...props.inProgress, subFlow: {type: 'PlayerSelect'}};
  props.domDialogs.hidden();
}