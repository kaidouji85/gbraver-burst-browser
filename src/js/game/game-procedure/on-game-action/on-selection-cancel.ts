import { SelectionCancel } from "../../game-actions/selection-cancel";
import { GameProps } from "../../game-props";
import { startTitle } from "../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: SelectionCancel;
};

/**
 * プレイヤー選択がキャンセルされた時のイベント
 * 本関数はpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了すると発火するPromise
 */
export async function onSelectionCancel(options: Options): Promise<void> {
  const { props } = options;
  props.inProgress = {
    type: "None",
  };
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}
