import { Config } from "../../../dom-scenes/config";
import { ConfigChangeStart } from "../../game-actions/config-change-start";
import { GameProps } from "../../game-props";
import { switchConfig } from "../switch-scene/switch-config";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: ConfigChangeStart;
};

/**
 * 設定変更開始時の処理
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onConfigChangeStart(options: Options): Promise<void> {
  const { props } = options;
  await props.fader.fadeOut();
  const config = await props.config.load();
  const scene = new Config({
    ...props,
    config,
  });
  switchConfig(props, scene);
  await props.fader.fadeIn();
}
