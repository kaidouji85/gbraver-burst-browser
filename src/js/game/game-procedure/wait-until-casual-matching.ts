import type { Battle as BattleSDK } from "@gbraver-burst-network/browser-sdk";

import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { matchingDialogConnector } from "../action-connector/matching-dialog-connector";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { SelectionComplete } from "../game-actions/selection-complete";
import { GameProps } from "../game-props";

/**
 * カジュアルマッチングするまで待機するヘルパー関数
 * @param props ゲームプロパティ
 * @param action アクション
 * @return バトルSDK
 */
export async function waitUntilCasualMatching(
  props: Readonly<GameProps>,
  action: SelectionComplete,
): Promise<BattleSDK> {
  try {
    props.domDialogBinder.bind(
      new MatchingDialog(props),
      matchingDialogConnector,
    );
    return await props.api.startCasualMatch(action.armdozerId, action.pilotId);
  } catch (e) {
    const dialog = new NetworkErrorDialog(props.resources, {
      type: "GotoTitle",
    });
    props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
    throw e;
  }
}
