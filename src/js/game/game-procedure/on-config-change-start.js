// @flow
import type {GameProps} from "../game-props";

/**
 * 設定変更開始時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onConfigChangeStart(props: $ReadOnly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  const config = await props.config.load();
  props.domScenes.startConfig(props.resources, config);
  await props.fader.fadeIn();
}