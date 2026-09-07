import { MAX_LOADING_TIME } from "../../../dom-scenes/dom-scene-binder/max-loading-time";
import { PathIds } from "../../../resource/path/ids";
import { preloadImages } from "../../../resource/preload-images";
import { waitTime } from "../../../wait/wait-time";
import { PasswordMatchGuestStart } from "../../game-actions/local-battle-guest-start";
import { GameProps } from "../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../bind-player-select-according-to-config";
import { waitUntilSharedResourcesLoaded } from "../wait-until-shared-resources-loaded";

/**
 * あいことば対戦（ゲスト）スタート
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onPasswordMatchGuestStart = async (options: {
  props: GameProps;
  action: PasswordMatchGuestStart;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
  await waitUntilSharedResourcesLoaded(props);

  props.inProgress = {
    type: "PasswordMatchGuest",
    passwordMatchGuest: { type: "PlayerSelect" },
  };
  await props.fader.fadeOut();
  const config = await props.config.load();
  await Promise.race([
    Promise.all([
      bindPlayerSelectAccordingToConfig(
        props,
        config.playerSelectorType,
        "🔓あいことばで入る",
      ),
      preloadImages(props.resources, [PathIds.CAMERA_ICON]),
    ]),
    waitTime(MAX_LOADING_TIME),
  ]);
  await props.fader.fadeIn();
};
