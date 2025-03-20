import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { GotoTitle } from "../../../post-network-error";
import { playTitleBGM } from "../../play-title-bgm";
import { startTitle } from "../../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  postAction: Readonly<GotoTitle>;
};

/**
 * タイトルに遷移する
 * @param options オプション
 * @returns 更新後のInProgress
 */
export async function gotoTitle(options: Options): Promise<InProgress> {
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
  return { type: "None" };
}
