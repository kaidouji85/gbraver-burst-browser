// @flow
import type {GameProps} from "../game-props";

/**
 * アカウント削除
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onDeleteAccount(props: $ReadOnly<GameProps>): Promise<void> {
  props.domDialogs.startWaiting('アカウント削除中')
  await props.api.deleteLoggedInUser();
  await props.fader.fadeOut();
  await props.api.logout();
}