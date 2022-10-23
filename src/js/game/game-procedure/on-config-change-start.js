// @flow
import { configConnector } from "../dom-scenes/action-connector/config-connector";
import { Config } from "../dom-scenes/scene/config";
import type { GameProps } from "../game-props";

/**
 * 設定変更開始時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onConfigChangeStart(
  props: $ReadOnly<GameProps>
): Promise<void> {
  await props.fader.fadeOut();
  const config = await props.config.load();
  const scene = new Config(props.resources, config);
  props.domScenes.bind(scene, configConnector);
  await props.fader.fadeIn();
}
