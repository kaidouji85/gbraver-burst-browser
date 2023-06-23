import {GameProps} from "../../game-props";
import {SelectionComplete} from "../../game-actions/selection-complete";
import {InProgress} from "../../in-progress/in-progress";
import {waitUntilCasualMatching} from "../wait-until-casual-matching";
import {startOnlineBattle} from "../start-online-battle";

/** カジュアルマッチが開始された */
type IsCasualMatchStarted = {
  isExecuted: true;
  inProgress: InProgress;
};

/** カジュアルマッチが開始されなかった */
type IsNotCasualMatchStarted = {
  isExecuted: false;
};

/** カジュアルマッチ開始情報 */
type Ret = IsCasualMatchStarted | IsNotCasualMatchStarted;

/**
 * 条件を満たせば、カジュアルマッチを開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return カジュアルマッチ開始情報
 */
export async function executeCasualMatchStartIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>
): Promise<Ret> {
  if (props.inProgress.type !== "CasualMatch") {
    return { isExecuted: false };
  }

  await props.api.disconnectWebsocket();
  const battle = await waitUntilCasualMatching(props, action);
  await startOnlineBattle(props, battle, "CASUAL MATCH");
  return {
    isExecuted: true,
    inProgress: {
      ...props.inProgress,
      casualMatch: { type: "Battle" }
    }
  };
}
