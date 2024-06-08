import { Config } from "../../../dom-scenes/config";
import { configConnector } from "../../action-connector/config-connector";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

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
  props.domSceneBinder.bind(scene, configConnector(props));
  await props.fader.fadeIn();
}

/** アクションタイプ */
const actionType = "ConfigChangeStart";

/** 設定変更開始時のイベントリスナーコンテナ */
export const configChangeStartContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onConfigChangeStart(props);
  },
};
