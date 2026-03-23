import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { LocalBattleHost } from "../../../in-progress/local-battle-host";
import { Online } from "../../../network-context/online";

/**
 * ローカル対戦（ホスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns inProgress更新結果
 */
export const startLocalBattleHost = async (
  props: GameProps & { networkContext: Online; inProgress: LocalBattleHost },
  action: SelectionComplete,
): Promise<InProgress> => {
  props.networkContext.localHostSDK.disconnectWebRTC();
  // TODO ロジックを作る
  return {
    ...props.inProgress,
    localBattleHost: { type: "Battle" },
  };
};
