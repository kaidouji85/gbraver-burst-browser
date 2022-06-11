// @flow
import type {ConfigChangeComplete} from "../game-actions";
import {isSoundConfigChanged} from "../config/browser-config";
import {reflectSoundVolume} from "../reflect-sound-volume";
import {startTitle} from "./start-title";
import type {GameProps} from "../game-props";

/**
 * 設定変更完了時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onConfigChangeComplete(props: $ReadOnly<GameProps>, action: ConfigChangeComplete): Promise<void> {
  await props.fader.fadeOut();
  const origin = await props.config.load();
  isSoundConfigChanged(origin, action.config) && reflectSoundVolume(props.resources, action.config);
  await props.config.save(action.config);
  await startTitle(props);
  await props.fader.fadeIn();
}