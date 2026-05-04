import { BattleSDK } from "@gbraver-burst-network/local-webrtc-browser-sdk";

import { LocalBattleHostDialog } from "../../dom-dialogs/local-battle-host";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";
import { Online } from "../network-context/online";
import { switchLocalBattleHostDialog } from "./switch-dialog/switch-local-battle-host-dialog";
import { switchNetworkErrorDialog } from "./switch-dialog/switch-network-error-dialog";
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

    const dialog = new LocalBattleHostDialog({
      ...props,
      password: room.roomID,
    });
    switchLocalBattleHostDialog(props, dialog);
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
