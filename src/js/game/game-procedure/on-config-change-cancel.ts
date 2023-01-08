import type { GameProps } from "../game-props";
import { startTitle } from "./start-title";

/**
 * 設定変更キャンセル時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onConfigChangeCancel(
  props: Readonly<GameProps>
): Promise<void> {
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}
