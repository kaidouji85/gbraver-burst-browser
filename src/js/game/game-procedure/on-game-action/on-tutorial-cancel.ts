import { TutorialCancel } from "../../game-actions/tutorial-cancel";
import { GameProps } from "../../game-props";

/**
 * チュートリアルのキャンセル
 * @param options オプション
 */
export function onTutorialCancel(options: {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: TutorialCancel;
}) {
  const { props } = options;
  props.domDialogBinder.hidden();
}
