import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { MatchingCanceled } from "../../game-actions/matching-canceled";
import { GameProps } from "../../game-props";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: MatchingCanceled;
};

/**
 * マッチング中止
 * 本関数はすべてのネットワークコンテキストに対応している
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onMatchingCanceled(options: Options): Promise<void> {
  const { props } = options;
  const dialog = new WaitingDialog("通信中......");
  switchWaitingDialog(props, dialog);
  if (props.networkContext.type === "online") {
    await props.networkContext.sdk.disconnectWebsocket();
  } else if (props.networkContext.type === "offline-lan") {
    props.networkContext.sdk.closeConnection();
  }
  props.domDialogBinder.hidden();
}
