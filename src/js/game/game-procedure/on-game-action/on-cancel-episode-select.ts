import { CancelEpisodeSelect } from "../../game-actions/cancel-episode-select";
import { GameProps } from "../../game-props";
import { startTitle } from "../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: CancelEpisodeSelect;
};

/**
 * エピソード選択キャンセル
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onCancelEpisodeSelect(options: Options): Promise<void> {
  const { props } = options;
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}
