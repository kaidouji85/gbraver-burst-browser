import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { disconnectAll } from "../../disconnect-all";
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
  const { networkContext } = props;
  if (
    props.inProgress.type !== "CasualMatch" ||
    networkContext.type !== "online"
  ) {
    return { isStarted: false };
  }

  await disconnectAll(props);
  const battle = await waitUntilCasualMatching(
    { ...props, networkContext },
    action,
  );
  await startOnlineBattle(props, battle, "カジュアルマッチ");
  return {
    isStarted: true,
    inProgress: {
      ...props.inProgress,
      casualMatch: { type: "Battle", battle },
    },
  };
}
