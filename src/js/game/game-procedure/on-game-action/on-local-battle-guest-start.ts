import { MAX_LOADING_TIME } from "../../../dom-scenes/dom-scene-binder/max-loading-time";
import { waitTime } from "../../../wait/wait-time";
import { LocalBattleGuestStart } from "../../game-actions/local-battle-guest-start";
import { GameProps } from "../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../bind-player-select-according-to-config";
import { waitUntilSharedResourcesLoaded } from "../wait-until-shared-resources-loaded";

/**
 * ローカル対戦（ゲスト）スタート
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onLocalBattleGuestStart = async (options: {
  props: GameProps;
  action: LocalBattleGuestStart;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
  await waitUntilSharedResourcesLoaded(props);

  props.inProgress = {
    type: "LocalBattleGuest",
    localBattleGuest: { type: "PlayerSelect" },
  };
  await props.fader.fadeOut();
  const config = await props.config.load();
  await Promise.race([
    bindPlayerSelectAccordingToConfig(props, config.playerSelectorType),
    waitTime(MAX_LOADING_TIME),
  ]);
  await props.fader.fadeIn();
};
