import { MAX_LOADING_TIME } from "../../../dom-scenes/dom-scene-binder/max-loading-time";
import { waitTime } from "../../../wait/wait-time";
import { CasualMatchStart } from "../../game-actions/casual-match-start";
import { GameProps } from "../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../bind-player-select-according-to-config";
import { waitUntilSharedResourcesLoaded } from "../wait-until-shared-resources-loaded";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: CasualMatchStart;
};

/**
 * カジュアルマッチ開始
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onCasualMatchStart(options: Options): Promise<void> {
  const { props } = options;
  props.domDialogBinder.hidden();
  await waitUntilSharedResourcesLoaded(props);

  props.inProgress = {
    type: "CasualMatch",
    casualMatch: { type: "PlayerSelect" },
  };
  await props.fader.fadeOut();
  const config = await props.config.load();
  await Promise.race([
    bindPlayerSelectAccordingToConfig(props, config.playerSelectorType),
    waitTime(MAX_LOADING_TIME),
  ]);
  await props.fader.fadeIn();
}
