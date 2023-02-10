import type { GbraverBurstBrowserConfig } from "../config/browser-config";
import type { PostNetworkError } from "../post-network-error";
import type { TutorialStageID } from "../tutorial-stages";
import { ArcadeStart } from "./arcade-start";
import { ExitMailVerifiedIncomplete } from "./exit-mail-verified-incomplete";
import { NetBattleStart } from "./net-battle-start";
import { NetBattleCancel } from "./net-battle-cancel";
import { ReloadRequest } from "./reload-request";
import { CasualMatchStart } from "./casual-match-start";
import { PrivateMatchHostStart } from "./private-match-host-start";
import { PrivateMatchGuestStart } from "./private-match-guest-start";
import { PrivateMatchEntry } from "./private-match-entry";
import { WithdrawPrivateMatchEntry } from "./withdraw-private-match-entry";
import { MatchingCanceled } from "./matching-canceled";
import { SelectionComplete } from "./selection-complete";
import { SelectionCancel } from "./selection-cancel";
import { DifficultySelectionComplete } from "./difficulty-selection-complete";
import { DifficultySelectionCancel } from "./difficulty-selection-cancel";
import { EndBattle } from "./end-battle";
import { SuddenlyBattleEnd } from "./suddenly-battle-end";
import { PostBattleAction } from "./post-battle-action";
import { EndNPCEnding } from "./end-npc-ending";
import { UniversalLogin } from "./universal-login";
import { LoginCancel } from "./login-cancel";
import { Logout } from "./logout";
import { AccountDeleteConsent } from "./account-delete-consent";
import { DeleteAccount } from "./delete-account";
import { CancelAccountDeletion } from "./cancel-account-deletion";
import { WebSocketAPIError } from "./web-socket-api-error";

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
  | PrivateMatchEntry
  | WithdrawPrivateMatchEntry
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
