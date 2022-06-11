// @flow
import {startTitle} from "./start-title";
import type {GameProps} from "../game-props";

/**
 * プレイヤー選択がキャンセルされた時のイベント
 * 本関数はpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了すると発火するPromise
 */
export async function onSelectionCancel(props: GameProps): Promise<void> {
  props.inProgress = {type: 'None'};
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}