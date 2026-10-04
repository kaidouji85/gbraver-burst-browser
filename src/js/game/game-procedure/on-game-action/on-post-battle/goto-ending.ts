import { waitTime } from "../../../../event/wait/wait-time";
import { fadeOut, stop } from "../../../../sounds/bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { GotoEnding } from "../../../post-battle";
import { MAX_LOADING_TIME } from "../../../scenes/dom-scenes/dom-scene-binder/max-loading-time";
import { NPCEnding } from "../../../scenes/dom-scenes/npc-ending";
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
  await Promise.all([
    props.fader.fadeOut(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  const scene = new NPCEnding(props);
  switchNpcEnding(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  scene.playBGM();
  props.inProgress = { type: "None" };
}
