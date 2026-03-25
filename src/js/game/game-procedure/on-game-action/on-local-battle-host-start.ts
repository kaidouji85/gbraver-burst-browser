import { MAX_LOADING_TIME } from "../../../dom-scenes/dom-scene-binder/max-loading-time";
import { waitTime } from "../../../wait/wait-time";
import { LocalBattleHostStart } from "../../game-actions/local-battle-host-start";
import { GameProps } from "../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../bind-player-select-according-to-config";
import { waitUntilSharedResourcesLoaded } from "../wait-until-shared-resources-loaded";

/**
 * ローカル対戦（ホスト）スタート
 * @param options オプション
 * @param options.props プロパティ
 * @param options.action アクション
 */
export const onLocalBattleHostStart = async (options: {
  props: GameProps;
  action: LocalBattleHostStart;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
  await waitUntilSharedResourcesLoaded(props);

  props.inProgress = {
    type: "LocalBattleHost",
    localBattleHost: {
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
};
