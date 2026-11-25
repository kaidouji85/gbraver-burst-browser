import { AnonymousBattleSDK } from "@gbraver-burst-network/anonymous-browser-sdk";
import { BattleSDK } from "@gbraver-burst-network/browser-sdk";

import { COMMUNICATING } from "../../../dialogs/waiting/captions";
import { WaitingDialog } from "../../../dialogs/waiting/waiting-dialog";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { CasualMatch } from "../../../in-progress/casual-match";
import { PasswordMatchGuest } from "../../../in-progress/password-match-guest";
import { PasswordMatchHost } from "../../../in-progress/password-match-host";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { Rematch } from "../../../post-battle";
import { startNetworkBattle } from "../../start-network-battle";
import { switchWaitingDialog } from "../../switch-dialog/switch-waiting-dialog";

/** 再戦成功 */
type SuccessRematch = {
  isSuccess: true;
  /** バトルSDK */
  battle: BattleSDK | AnonymousBattleSDK;
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
 * あいことば対戦（ホスト）から再戦を行う
 * @param options オプション
 * @param options.inProgress ステート
 * @param options.postAction 再戦アクション
 * @returns 再戦結果
 */
const rematchPasswordMatchHost = async (options: {
  inProgress: Readonly<PasswordMatchHost>;
  postAction: Readonly<Rematch>;
}): Promise<RematchResult> => {
  const { inProgress, postAction } = options;
  if (inProgress.passwordMatchHost.type !== "Rematch") {
    return { isSuccess: false };
  }

  const { rematchRoom } = inProgress.passwordMatchHost;
  const battle = await rematchRoom.requestRematch(postAction);
  rematchRoom.destructor();
  return {
    isSuccess: true,
    battle,
    inProgress: {
      ...inProgress,
      passwordMatchHost: { type: "Battle", battle },
    },
  };
};

/**
 * あいことば対戦（ゲスト）から再戦を行う
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction 再戦アクション
 * @returns 再戦結果
 */
const rematchPasswordMatchGuest = async (options: {
  inProgress: Readonly<PasswordMatchGuest>;
  postAction: Readonly<Rematch>;
}): Promise<RematchResult> => {
  const { inProgress, postAction } = options;
  if (inProgress.passwordMatchGuest.type !== "Rematch") {
    return { isSuccess: false };
  }

  const { rematchRoom } = inProgress.passwordMatchGuest;
  const battle = await rematchRoom.requestRematch(postAction);
  rematchRoom.destructor();
  return {
    isSuccess: true,
    battle,
    inProgress: {
      ...inProgress,
      passwordMatchGuest: { type: "Battle", battle },
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

  const dialog = new WaitingDialog(COMMUNICATING);
  switchWaitingDialog(props, dialog);

  const result: RematchResult = await (async () => {
    switch (inProgress.type) {
      case "CasualMatch":
        return await rematchCasualMatch({ inProgress, postAction });
      case "PrivateMatchHost":
        return await rematchPrivateMatchHost({ inProgress, postAction });
      case "PrivateMatchGuest":
        return await rematchPrivateMatchGuest({ inProgress, postAction });
      case "PasswordMatchHost":
        return await rematchPasswordMatchHost({ inProgress, postAction });
      case "PasswordMatchGuest":
        return await rematchPasswordMatchGuest({ inProgress, postAction });
      default:
        return { isSuccess: false };
    }
  })();

  props.rematchCancelled.unbind();
  if (!result.isSuccess) {
    props.domDialogBinder.hidden();
    return;
  }

  props.inProgress = result.inProgress;
  await startNetworkBattle(props, result.battle, "再戦");
};
