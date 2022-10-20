// @flow
import type { GameProps } from "../game-props";

/**
 * マッチング中止
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onMatchingCanceled(
  props: $ReadOnly<GameProps>
): Promise<void> {
  props.domDialogs.startWaiting("通信中......");
  await props.api.disconnectWebsocket();
  props.domDialogs.hidden();
}
