import { ReloadRequest } from "../../game-actions/reload-request";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: ReloadRequest;
};

/**
 * 画面リロード依頼時の処理
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onReloadRequest(options: Options): Promise<void> {
  const { props } = options;
  await props.fader.fadeOut();
  window.location.reload();
}
