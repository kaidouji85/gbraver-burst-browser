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
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
}
