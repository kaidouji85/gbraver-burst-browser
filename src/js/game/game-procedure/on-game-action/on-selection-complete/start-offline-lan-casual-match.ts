import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { OfflineLANCasualMatch } from "../../../in-progress/offline-lan-casual-match";
import { OfflineLAN } from "../../../network-context/offline-lan";
import { startOnlineBattle } from "../../start-online-battle";
import { waitUntilOfflineLANCasualMatching } from "../../wait-until-offline-lan-casual-matching";

/**
 * カジュアルマッチ（オフラインLAN）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns inProgress更新結果
 */
export async function startOfflineLANCasualMatch(
  props: Readonly<
    GameProps & {
      inProgress: OfflineLANCasualMatch;
      networkContext: OfflineLAN;
    }
  >,
  action: Readonly<SelectionComplete>,
): Promise<InProgress> {
  props.networkContext.sdk.closeConnection();
  const battle = await waitUntilOfflineLANCasualMatching(props, action);
  await startOnlineBattle(props, battle, "CASUAL MATCH");
  return {
    ...props.inProgress,
    offlineLANCasualMatch: { type: "Battle" },
  };
}
