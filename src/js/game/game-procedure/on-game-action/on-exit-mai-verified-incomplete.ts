import type { GameProps } from "../../game-props";

/**
 * メール認証未完了画面を抜ける時の処理
 *
 * @returns 処理が完了したら発火するPromise
 */
export async function onExitMailVerifiedIncomplete(
  props: Readonly<GameProps>,
): Promise<void> {
  await props.fader.fadeOut();
  await props.api.logout();
}
