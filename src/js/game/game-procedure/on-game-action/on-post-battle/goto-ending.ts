import { MAX_LOADING_TIME } from "../../../../dom-scenes/dom-scene-binder/max-loading-time";
import { NPCEnding } from "../../../../dom-scenes/npc-ending";
import { waitTime } from "../../../../wait/wait-time";
import { GameProps } from "../../../game-props";
import { GotoEnding } from "../../../post-battle";
import { switchNpcEnding } from "../../switch-scene/switch-npc-ending";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  postAction: Readonly<GotoEnding>;
};

/**
 * エンディングに遷移する
 * 本関数はprops.inProgressを変更する副作用を持つ
 * @param options オプション
 * @returns 更新後のInProgress
 */
export async function gotoEnding(options: Options) {
  const { props } = options;
  await props.fader.fadeOut();
  const scene = new NPCEnding(props);
  switchNpcEnding(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  scene.playBGM();
  props.inProgress = { type: "None" };
}
