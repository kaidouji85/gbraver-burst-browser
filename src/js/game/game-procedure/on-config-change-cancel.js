// @flow
import {startTitle} from "./start-title";
import type {GameProps} from "../game-props";

/**
 * 設定変更キャンセル時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onConfigChangeCancel(props: $ReadOnly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}