import type { GameProps } from "../game-props";

/**
 * ユニバーサルログイン
 *
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function onUniversalLogin(
  props: Readonly<GameProps>,
): Promise<void> {
  await props.fader.fadeOut();
  await props.api.gotoLoginPage();
}
