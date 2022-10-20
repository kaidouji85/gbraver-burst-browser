// @flow
import type { GameProps } from "../game-props";

/**
 * バトル強制終了時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が終了すると発火するPromise
 */
export async function onSuddenlyEndBattle(
  props: $ReadOnly<GameProps>
): Promise<void> {
  props.domDialogs.startNetworkError(props.resources, { type: "GotoTitle" });
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
}
