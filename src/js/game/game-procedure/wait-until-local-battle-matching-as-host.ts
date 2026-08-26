import { BattleSDK } from "@gbraver-burst-network/anonymous-browser-sdk";

import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { PrivateMatchHostDialog } from "../../dom-dialogs/private-match-host";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";
import { Online } from "../network-context/online";
import { switchNetworkErrorDialog } from "./switch-dialog/switch-network-error-dialog";
import { switchPrivateMatchHostDialogWhenLocalBattle } from "./switch-dialog/switch-private-match-host-dialog-when-local-battle";
import { switchWaitingDialog } from "./switch-dialog/switch-waiting-dialog";

/**
 * ローカル対戦（ホスト）でマッチング成立まで待つ
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns バトルSDK
 */
export const waitUntilLocalBattleMatchingAsHost = async (
  props: Readonly<GameProps & { networkContext: Online }>,
  action: Readonly<SelectionComplete>,
): Promise<BattleSDK> => {
  try {
    switchWaitingDialog(props, new WaitingDialog("ルーム作成中......"));
    const room = await props.networkContext.localHostSDK.createRoom(action);
    if (!room) {
      throw new Error("ルームの作成に失敗");
    }

    const dialog = new PrivateMatchHostDialog({
      ...props,
      roomID: room.roomID,
    });
    switchPrivateMatchHostDialogWhenLocalBattle(props, dialog);
    return await room.waitUntilMatching();
  } catch (e) {
    const errorDialog = new NetworkErrorDialog({
      ...props,
      postNetworkError: { type: "GotoTitle" },
    });
    switchNetworkErrorDialog(props, errorDialog);
    throw e;
  }
};
