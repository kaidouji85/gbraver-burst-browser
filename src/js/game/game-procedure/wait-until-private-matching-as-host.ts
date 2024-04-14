import { Battle as BattleSDK } from "@gbraver-burst-network/browser-sdk";

import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { privateMatchHostDialogConnector } from "../action-connector/private-match-host-dialog-connector";
import { waitingDialogConnector } from "../action-connector/waiting-dialog-connector";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";

/**
 * プライベートマッチ（ホスト）でマッチング成立まで待つ
 * @param props ゲームプロパティ
 * @param action アクション
 * @return バトルSDK
 */
export async function waitUntilPrivateMatchingAsHost(
  props: Readonly<GameProps>,
  action: SelectionComplete,
): Promise<BattleSDK> {
  try {
    props.domDialogBinder.bind(
      new WaitingDialog("ルーム作成中......"),
      waitingDialogConnector,
    );
    const room = await props.api.createPrivateMatchRoom(
      action.armdozerId,
      action.pilotId,
    );
    props.domDialogBinder.bind(
      new PrivateMatchHostDialog(props.resources, room.roomID),
      privateMatchHostDialogConnector,
    );
    return await room.waitUntilMatching();
  } catch (e) {
    props.domDialogBinder.bind(
      new NetworkErrorDialog({
        ...props,
        postNetworkError: {
          type: "GotoTitle",
        },
      }),
      networkErrorDialogConnector,
    );
    throw e;
  }
}
