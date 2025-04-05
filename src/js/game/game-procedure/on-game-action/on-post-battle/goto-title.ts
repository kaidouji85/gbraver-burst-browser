import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { GotoTitle } from "../../../post-network-error";
import { playTitleBGM } from "../../play-title-bgm";
import { startTitle } from "../../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  postAction: Readonly<GotoTitle>;
};

/**
 * タイトルに遷移する
 * 本関数はprops.inPrigressを変更する副作用がある
 * @param options オプション
 */
export async function gotoTitle(options: Options) {
  const { props } = options;
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
  props.inProgress = { type: "None" };
}
