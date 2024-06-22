import { Battle as BattleSDK } from "@gbraver-burst-network/browser-sdk";

import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { switchWaitingDialog } from "./switch-dialog/switch-waiting-dialog";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";
import { switchNetworkErrorDialog } from "./switch-dialog/switch-network-error-dialog";
import { switchPrivateMatchHostDialog } from "./switch-dialog/switch-private-match-host-dialog";

/**
 * プライベートマッチ（ホスト）でマッチング成立まで待つ
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns バトルSDK
 */
export async function waitUntilPrivateMatchingAsHost(
  props: Readonly<GameProps>,
  action: SelectionComplete,
): Promise<BattleSDK> {
  try {
    switchWaitingDialog(props, new WaitingDialog("ルーム作成中......"));
    const room = await props.api.createPrivateMatchRoom(
      action.armdozerId,
      action.pilotId,
    );
    const dialog = new PrivateMatchHostDialog({
      ...props,
      roomID: room.roomID,
    });
    switchPrivateMatchHostDialog(props, dialog);
    return await room.waitUntilMatching();
  } catch (e) {
    const errorDialog = new NetworkErrorDialog({
      ...props,
      postNetworkError: { type: "GotoTitle" },
    });
    switchNetworkErrorDialog(props, errorDialog);
    throw e;
  }
}
