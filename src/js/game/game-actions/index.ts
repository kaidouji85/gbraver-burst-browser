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
import { EndNetworkError } from "./end-network-error";
import { ConfigChangeStart } from "./config-change-start";
import { ConfigChangeComplete } from "./config-change-complete";
import { ConfigChangeCancel } from "./config-change-cancel";
import { TutorialStart } from "./tutorial-start";
import { CancelTutorialSelect } from "./cancel-tutorial-select";
import { SelectTutorialStage } from "./select-tutorial-stage";

/** ゲーム全体で利用するアクション */
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
