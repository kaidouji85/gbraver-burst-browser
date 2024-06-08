import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress/in-progress";
import { startOnlineBattle } from "../../start-online-battle";
import { waitUntilCasualMatching } from "../../wait-until-casual-matching";

/** カジュアルマッチが開始された */
type IsCasualMatchStarted = {
  isStarted: true;
  inProgress: InProgress;
};

/** カジュアルマッチが開始されなかった */
type IsNotCasualMatchStarted = {
  isStarted: false;
};

/** カジュアルマッチ開始情報 */
type Ret = IsCasualMatchStarted | IsNotCasualMatchStarted;

/**
 * 条件を満たせば、カジュアルマッチを開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns カジュアルマッチ開始情報
 */
export async function startCasualMatchIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>,
): Promise<Ret> {
  if (props.inProgress.type !== "CasualMatch") {
    return { isStarted: false };
  }

  await props.api.disconnectWebsocket();
  const battle = await waitUntilCasualMatching(props, action);
  await startOnlineBattle(props, battle, "CASUAL MATCH");
  return {
    isStarted: true,
    inProgress: {
      ...props.inProgress,
      casualMatch: { type: "Battle" },
    },
  };
}
