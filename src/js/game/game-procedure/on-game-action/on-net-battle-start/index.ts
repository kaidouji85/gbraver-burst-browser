import { NetBattleStart } from "../../../game-actions/net-battle-start";
import { GameProps } from "../../../game-props";
import { startOnlineNetBattle } from "./start-online-net-battle";

/** onNetBattleStartオプション */
type OnNetBattleStartOptions = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: NetBattleStart;
};

/**
 * ネットバトル開始
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onNetBattleStart(
  options: OnNetBattleStartOptions,
): Promise<void> {
  const { props } = options;
  const { networkContext } = props;
  if (networkContext.type === "online") {
    await startOnlineNetBattle({ ...props, networkContext });
  }
}
