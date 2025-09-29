import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { OfflineLANCasualMatch } from "../../../in-progress/offline-lan-casual-match";
import { OfflineLAN } from "../../../network-context/offline-lan";
import { waitUntilOfflineLANCasualMatching } from "../../wait-until-offline-lan-casual-matching";

/**
 * カジュアルマッチ（オフラインLAN）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 */
export async function startOfflineLANCasualMatch(
  props: GameProps & {
    inProgress: OfflineLANCasualMatch;
    networkContext: OfflineLAN;
  },
  action: Readonly<SelectionComplete>,
) {
  props.networkContext.sdk.closeConnection();
  await waitUntilOfflineLANCasualMatching(props, action);
}
