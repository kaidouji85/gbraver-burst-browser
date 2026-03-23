import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { LocalBattleHost } from "../../../in-progress/local-battle-host";
import { Online } from "../../../network-context/online";
import { startLocalBattle } from "../../start-local-battle";
import { waitUntilLocalBattleMatchingAsHost } from "../../wait-until-local-battle-matching-as-host";

/**
 * ローカル対戦（ホスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns inProgress更新結果
 */
export const startLocalBattleHost = async (
  props: Readonly<
    GameProps & { networkContext: Online; inProgress: LocalBattleHost }
  >,
  action: Readonly<SelectionComplete>,
): Promise<InProgress> => {
  props.networkContext.localHostSDK.disconnectWebRTC();
  const battle = await waitUntilLocalBattleMatchingAsHost(props, action);
  await startLocalBattle(props, battle);
  return {
    ...props.inProgress,
    localBattleHost: { type: "Battle" },
  };
};
