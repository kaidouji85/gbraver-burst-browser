import { MAX_LOADING_TIME } from "../../../dom-scenes/dom-scene-binder/max-loading-time";
import { waitTime } from "../../../wait/wait-time";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../bind-player-select-according-to-config";
import { loadFullResource } from "../load-full-resource";

/**
 * プライベートマッチ（ホスト）スタート
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onPrivateMatchHostStart(props: GameProps): Promise<void> {
  props.domDialogBinder.hidden();
  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  props.inProgress = {
    type: "PrivateMatchHost",
    privateMatchHost: {
      type: "PlayerSelect",
    },
  };
  await props.fader.fadeOut();
  const config = await props.config.load();
  await Promise.race([
    bindPlayerSelectAccordingToConfig(props, config.playerSelectorType),
    waitTime(MAX_LOADING_TIME),
  ]);
  await props.fader.fadeIn();
}

/** アクションタイプ */
export const actionType = "PrivateMatchHostStart";

/** プライベートマッチ（ホスト）スタート時のイベントリスナーコンテナ */
export const privateMatchHostStartContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onPrivateMatchHostStart(props);
  },
};
