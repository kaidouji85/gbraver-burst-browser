import type { ArmDozerId, GameEnd, PilotId } from "gbraver-burst-core";

import type { GbraverBurstBrowserConfig } from "./config/browser-config";
import type { NPCBattleCourseDifficulty } from "./npc-battle-courses";
import type { PostBattle } from "./post-battle";
import type { PostNetworkError } from "./post-network-error";
import type { TutorialStageID } from "./tutorial-stages";

/** 画面リロード依頼 */
export type ReloadRequest = {
  type: "ReloadRequest";
};

/** メール認証未完了画面を抜ける */
export type ExitMailVerifiedIncomplete = {
  type: "ExitMailVerifiedIncomplete";
};

/** アーケードモード開始 */
export type ArcadeStart = {
  type: "ArcadeStart";
};

/** ネット対戦スタート */
export type NetBattleStart = {
  type: "NetBattleStart";
};

/** ネット対戦キャンセル */
export type NetBattleCancel = {
  type: "NetBattleCancel";
};

/** カジュアルマッチスタート */
export type CasualMatchStart = {
  type: "CasualMatchStart";
};

/** プライベートマット（ホスト）スタート */
export type PrivateMatchHostStart = {
  type: "PrivateMatchHostStart"
}

/** プライベートマット（ゲスト）スタート */
export type PrivateMatchGuestStart = {
  type: "PrivateMatchGuestStart"
};

/** マッチング中止 */
export type MatchingCanceled = {
  type: "MatchingCanceled";
};

/**
 * プレイヤー選択完了
 */
export type SelectionComplete = {
  type: "SelectionComplete";

  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId;

  /** 選択したパイロットのID */
  pilotId: PilotId;
};

/**
 * プレイヤー選択キャンセル
 */
export type SelectionCancel = {
  type: "SelectionCancel";
};

/**
 * 難易度選択完了
 */
export type DifficultySelectionComplete = {
  type: "DifficultySelectionComplete";

  /** 選択した難易度 */
  difficulty: NPCBattleCourseDifficulty;
};

/**
 * 難易度選択キャンセル
 */
export type DifficultySelectionCancel = {
  type: "DifficultySelectionCancel";
};

/** 戦闘終了 */
export type EndBattle = {
  type: "EndBattle";

  /** ゲーム終了情報 */
  gameEnd: GameEnd;

  /** アニメーションタイムスケール */
  animationTimeScale: number;
};

/** バトル強制終了 */
export type SuddenlyBattleEnd = {
  type: "SuddenlyBattleEnd";
};

/** 戦闘終了後アクション決定 */
export type PostBattleAction = {
  type: "PostBattleAction";

  /** 決定したアクション */
  action: PostBattle;
};

/**
 * NPC ルート エンディング 終了
 */
export type EndNPCEnding = {
  type: "EndNPCEnding";
};

/** ユニバーサルログインを実行する */
export type UniversalLogin = {
  type: "UniversalLogin";
};

/** ログインダイアからのログインを中断した */
export type LoginCancel = {
  type: "LoginCancel";
};

/** ログアウト */
export type Logout = {
  type: "Logout";
};

/** アカウント削除同意 */
export type AccountDeleteConsent = {
  type: "AccountDeleteConsent";
};

/** アカウント削除 */
export type DeleteAccount = {
  type: "DeleteAccount";
};

/** アカウント削除同意ダイアログを閉じる */
export type CancelAccountDeletion = {
  type: "CancelAccountDeletion";
};

/** WebSocketAPI エラー発生 */
export type WebSocketAPIError = {
  type: "WebSocketAPIError";

  /** エラー情報 */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  error: any;
  /* eslint-enable */
};

/** 通信エラーダイアログを閉じる */
export type EndNetworkError = {
  type: "EndNetworkError";

  /** ダイアログを閉じた後の処理に必要な情報 */
  postNetworkError: PostNetworkError;
};

/** 設定変更開始 */
export type ConfigChangeStart = {
  type: "ConfigChangeStart";
};

/** 設定変更完了 */
export type ConfigChangeComplete = {
  type: "ConfigChangeComplete";

  /** 変更した設定内容 */
  config: GbraverBurstBrowserConfig;
};

/** 設定変更キャンセル */
export type ConfigChangeCancel = {
  type: "ConfigChangeCancel";
};

/** チュートリアルスタート */
export type TutorialStart = {
  type: "TutorialStart";
};

/** チュートリアル選択キャンセル */
export type CancelTutorialSelect = {
  type: "CancelTutorialSelect";
};

/** チュートリアルステージ選択完了 */
export type SelectTutorialStage = {
  type: "SelectTutorialStage";

  /** ステージID */
  id: TutorialStageID;

  /** ステージレベル */
  level: number;
};

/**
 * ゲーム全体で利用するアクション
 */
export type GameAction =
  | ReloadRequest
  | ExitMailVerifiedIncomplete
  | ArcadeStart
  | NetBattleStart
  | NetBattleCancel
  | CasualMatchStart
  | PrivateMatchHostStart
  | PrivateMatchGuestStart
  | MatchingCanceled
  | SelectionComplete
  | SelectionCancel
  | DifficultySelectionComplete
  | DifficultySelectionCancel
  | EndBattle
  | SuddenlyBattleEnd
  | PostBattleAction
  | EndNPCEnding
  | UniversalLogin
  | LoginCancel
  | Logout
  | AccountDeleteConsent
  | DeleteAccount
  | CancelAccountDeletion
  | WebSocketAPIError
  | EndNetworkError
  | ConfigChangeStart
  | ConfigChangeComplete
  | ConfigChangeCancel
  | TutorialStart
  | CancelTutorialSelect
  | SelectTutorialStage;
