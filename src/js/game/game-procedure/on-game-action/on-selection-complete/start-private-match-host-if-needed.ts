import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress/in-progress";
import { startOnlineBattle } from "../../start-online-battle";
import { waitUntilPrivateMatchingAsHost } from "../../wait-until-private-matching-as-host";

/** プライベートマッチ（ホスト）を開始した */
type IsPrivateMatchHostStarted = {
  isStarted: true;
  /** InProgress更新結果 */
  inProgress: InProgress;
};

/** プライベートマッチ（ホスト）を開始していない */
type IsNotPrivateMatchHostStarted = {
  isStarted: false;
};

/** プライベートマッチ（ホスト）開始情報 */
type Ret = IsPrivateMatchHostStarted | IsNotPrivateMatchHostStarted;

/**
 * 条件を満たした場合、プライベートマッチ（ホスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns プライベートマッチ（ホスト）開始情報
 */
export async function startPrivateMatchHostIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>,
): Promise<Ret> {
  if (props.inProgress.type !== "PrivateMatchHost") {
    return { isStarted: false };
  }

  await props.api.disconnectWebsocket();
  const battle = await waitUntilPrivateMatchingAsHost(props, action);
  await startOnlineBattle(props, battle, "PRIVATE MATCH");
  return {
    isStarted: true,
    inProgress: {
      ...props.inProgress,
      privateMatchHost: { type: "Battle" },
    },
  };
}
