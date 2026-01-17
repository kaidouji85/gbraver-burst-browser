import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { playTitleBGM } from "../../play-title-bgm";
import { startTitle } from "../../start-title";

/**
 * 汎用的なバトル強制終了
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function forceEndBattle(props: Readonly<GameProps>) {
  const [title] = await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  title.startTitleBackgroundLoop();
  await props.fader.fadeIn();
  playTitleBGM(props);
}
