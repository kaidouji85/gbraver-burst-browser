import { MAX_LOADING_TIME } from "../../../../dom-scenes/dom-scene-binder/max-loading-time";
import { waitTime } from "../../../../wait/wait-time";
import { GameProps } from "../../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../../bind-player-select-according-to-config";
import { waitUntilSharedResourcesLoaded } from "../../wait-until-shared-resources-loaded";

/**
 * ネット対戦開始（オフラインLAN）
 * @param props ゲームプロパティ
 */
export async function startOfflineLANNetBattle(
  props: GameProps,
): Promise<void> {
  props.domDialogBinder.hidden();
  await waitUntilSharedResourcesLoaded(props);

  props.inProgress = {
    type: "OfflineLANCasualMatch",
    offlineLANCasualMatch: { type: "PlayerSelect" },
  };
  await props.fader.fadeOut();
  const config = await props.config.load();
  await Promise.race([
    bindPlayerSelectAccordingToConfig(props, config.playerSelectorType),
    waitTime(MAX_LOADING_TIME),
  ]);
  await props.fader.fadeIn();
}
