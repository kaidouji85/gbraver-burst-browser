import type { GameProps } from "../../game-props";

/**
 * 画面リロード依頼時の処理
 *
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function onReloadRequest(
  props: Readonly<GameProps>,
): Promise<void> {
  await props.fader.fadeOut();
  window.location.reload();
}
