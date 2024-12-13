import { CancelTutorialSelect } from "../../game-actions/cancel-tutorial-select";
import { GameProps } from "../../game-props";
import { startTitle } from "../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: CancelTutorialSelect;
};

/**
 * チュートリアル選択キャンセル
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onCancelTutorialSelect(options: Options): Promise<void> {
  const { props } = options;
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}
