import { PrivateMatchRoom } from "@gbraver-burst-network/browser-core";

import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { waitingDialogConnector } from "../action-connector/waiting-dialog-connector";
import { SelectionComplete } from "../game-actions";
import { GameProps } from "../game-props";

async function createPrivateMatchRoom(
  props: Readonly<GameProps>,
  action: SelectionComplete
): Promise<PrivateMatchRoom> {
  try {
    props.domDialogBinder.bind(
      new WaitingDialog("ルーム作成中……"),
      waitingDialogConnector
    );
    return await props.api.createPrivateMatchRoom(
      action.armdozerId,
      action.pilotId
    );
  } catch (e) {
    props.domDialogBinder.bind(
      new NetworkErrorDialog(props.resources, {
        type: "GotoTitle",
      }),
      networkErrorDialogConnector
    );
    throw e;
  }
}

export async function startPrivateMatchHost(
  props: Readonly<GameProps>,
  action: SelectionComplete
): Promise<void> {
  const room = await createPrivateMatchRoom(props, action);
}
