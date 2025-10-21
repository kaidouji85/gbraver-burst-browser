import type { BattleSDK } from "@gbraver-burst-network/browser-sdk";

import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";
import { Online } from "../network-context/online";
import { switchMatchingDialog } from "./switch-dialog/switch-matching-dialog";
import { switchNetworkErrorDialog } from "./switch-dialog/switch-network-error-dialog";

/**
 * カジュアルマッチングするまで待機するヘルパー関数
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns バトルSDK
 */
export async function waitUntilCasualMatching(
  props: Readonly<GameProps & { networkContext: Online }>,
  action: SelectionComplete,
): Promise<BattleSDK> {
  try {
    switchMatchingDialog(props, new MatchingDialog(props));
    return await props.networkContext.sdk.startCasualMatch(
      action.armdozerId,
      action.pilotId,
    );
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
