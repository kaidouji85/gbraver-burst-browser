import { MAX_LOADING_TIME } from "../../../dom-scenes/dom-scene-binder/max-loading-time";
import { PathIds } from "../../../resource/path/ids";
import { preLoadImages } from "../../../resource/pre-load-images";
import { waitTime } from "../../../wait/wait-time";
import { ArcadeStart } from "../../game-actions/arcade-start";
import { GameProps } from "../../game-props";
import { bindPlayerSelectAccordingToConfig } from "../bind-player-select-according-to-config";
import { waitUntilSharedResourcesLoaded } from "../wait-until-shared-resources-loaded";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: ArcadeStart;
};

/**
 * アーケードモード開始
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onArcadeStart(options: Options): Promise<void> {
  const { props } = options;
  await waitUntilSharedResourcesLoaded(props);

  props.inProgress = {
    type: "NPCBattle",
    npcBattle: {
      type: "PlayerSelect",
    },
  };
  await props.fader.fadeOut();
  const config = await props.config.load();
  await Promise.race([
    Promise.all([
      bindPlayerSelectAccordingToConfig(
        props,
        config.playerSelectorType,
        "🕹️アーケード",
      ),
      preLoadImages(props.resources, [
        PathIds.NPC_COURSE_EASY_ICON,
        PathIds.NPC_COURSE_NORMAL_ICON,
        PathIds.NPC_COURSE_HARD_ICON,
        PathIds.NPC_COURSE_VERY_HARD_ICON,
      ]),
    ]),
    waitTime(MAX_LOADING_TIME),
  ]);
  await props.fader.fadeIn();
}
