import { Config } from "../../../dom-scenes/config";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchConfig } from "../switch-scene/switch-config";

/**
 * 設定変更開始時の処理
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onConfigChangeStart(props: Readonly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  const config = await props.config.load();
  const scene = new Config({
    ...props,
    config,
  });
  switchConfig(props, scene);
  await props.fader.fadeIn();
}

/** アクションタイプ */
const actionType = "ConfigChangeStart";

/** 設定変更開始時のイベントリスナーコンテナ */
export const configChangeStartContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onConfigChangeStart(props);
    }
  },
};
