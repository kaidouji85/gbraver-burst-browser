import { BattleSDK } from "@gbraver-burst-network/browser-sdk";

import { WaitingDialog } from "../../../dialogs/waiting/waiting-dialog";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { CasualMatch } from "../../../in-progress/casual-match";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { Rematch } from "../../../post-battle";
import { startOnlineBattle } from "../../start-online-battle";
import { switchWaitingDialog } from "../../switch-dialog/switch-waiting-dialog";

/** 再戦成功 */
type SuccessRematch = {
  isSuccess: true;
  /** バトルSDK */
  battle: BattleSDK;
  /** inProgress更新結果 */
  inProgress: InProgress;
};

/** 再戦失敗 */
type FailRematch = {
  isSuccess: false;
};

/** 再戦結果 */
type RematchResult = SuccessRematch | FailRematch;

/**
 * カジュアルマッチから再戦を行う
 * @param options オプション
 * @param options.inProgress ステート
 * @param options.postAction 再戦アクション
 * @returns 再戦結果
 */
const rematchCasualMatch = async (options: {
  inProgress: Readonly<CasualMatch>;
  postAction: Readonly<Rematch>;
}): Promise<RematchResult> => {
  const { inProgress, postAction } = options;
  if (inProgress.casualMatch.type !== "Rematch") {
    return { isSuccess: false };
  }

  const { rematchRoom } = inProgress.casualMatch;
  const battle = await rematchRoom.requestRematch(postAction);
  return {
    isSuccess: true,
    battle,
    inProgress: { ...inProgress, casualMatch: { type: "Battle", battle } },
  };
};

/**
 * プライベートマッチ（ホスト）から再戦を行う
 * @param options オプション
 * @param options.inProgress ステート
 * @param options.postAction 再戦アクション
 * @returns 再戦結果
 */
const rematchPrivateMatchHost = async (options: {
  inProgress: Readonly<PrivateMatchHost>;
  postAction: Readonly<Rematch>;
}): Promise<RematchResult> => {
  const { inProgress, postAction } = options;
  if (inProgress.privateMatchHost.type !== "Rematch") {
    return { isSuccess: false };
  }

  const { rematchRoom } = inProgress.privateMatchHost;
  const battle = await rematchRoom.requestRematch(postAction);
  return {
    isSuccess: true,
    battle,
    inProgress: { ...inProgress, privateMatchHost: { type: "Battle", battle } },
  };
};

/**
 * プライベートマッチ（ゲスト）から再戦を行う
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction 再戦アクション
 * @returns 再戦結果
 */
const rematchPrivateMatchGuest = async (options: {
  inProgress: Readonly<PrivateMatchGuest>;
  postAction: Readonly<Rematch>;
}): Promise<RematchResult> => {
  const { inProgress, postAction } = options;
  if (inProgress.privateMatchGuest.type !== "Rematch") {
    return { isSuccess: false };
  }

  const { rematchRoom } = inProgress.privateMatchGuest;
  const battle = await rematchRoom.requestRematch(postAction);
  return {
    isSuccess: true,
    battle,
    inProgress: {
      ...inProgress,
      privateMatchGuest: { type: "Battle", battle },
    },
  };
};

/**
 * 再戦を行う
 * 本関数はprops.inProgressを変更する副作用を持つ
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction 再戦アクション
 */
export const rematch = async (options: {
  props: GameProps;
  postAction: Readonly<Rematch>;
}) => {
  const { props, postAction } = options;
  const { inProgress } = props;

  const dialog = new WaitingDialog("通信中......");
  switchWaitingDialog(props, dialog);

  let result: RematchResult = { isSuccess: false };
  if (inProgress.type === "CasualMatch") {
    result = await rematchCasualMatch({ inProgress, postAction });
  } else if (inProgress.type === "PrivateMatchHost") {
    result = await rematchPrivateMatchHost({ inProgress, postAction });
  } else if (inProgress.type === "PrivateMatchGuest") {
    result = await rematchPrivateMatchGuest({ inProgress, postAction });
  }

  if (!result.isSuccess) {
    props.domDialogBinder.hidden();
    return;
  }

  props.inProgress = result.inProgress;
  await startOnlineBattle(props, result.battle, "再戦");
};
