import { BattleInfo } from "@gbraver-burst-network/offline-browser-sdk/lib/offline-browser-sdk";

import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";
import { OfflineLAN } from "../network-context/offline-lan";
import { switchMatchingDialog } from "./switch-dialog/switch-matching-dialog";
import { switchNetworkErrorDialog } from "./switch-dialog/switch-network-error-dialog";

/**
 * カジュアルマッチング（オフラインLAN）するまで待機するヘルパー関数
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns バトルSDK
 */
export async function waitUntilOfflineLANCasualMatching(
  props: Readonly<GameProps & { networkContext: OfflineLAN }>,
  action: SelectionComplete,
): Promise<BattleInfo> {
  try {
    switchMatchingDialog(props, new MatchingDialog(props));
    return await props.networkContext.sdk.enterRoom(action);
  } catch (e) {
    const dialog = new NetworkErrorDialog({
      ...props,
      postNetworkError: {
        type: "GotoTitle",
      },
    });
    switchNetworkErrorDialog(props, dialog);
    throw e;
  }
}
