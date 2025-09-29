import { AccountDeleteConsent } from "./account-delete-consent";
import { ArcadeStart } from "./arcade-start";
import { CancelAccountDeletion } from "./cancel-account-deletion";
import { CancelEpisodeSelect } from "./cancel-episode-select";
import { CasualMatchStart } from "./casual-match-start";
import { ConfigChangeCancel } from "./config-change-cancel";
import { ConfigChangeComplete } from "./config-change-complete";
import { ConfigChangeStart } from "./config-change-start";
import { DeleteAccount } from "./delete-account";
import { DifficultySelectionCancel } from "./difficulty-selection-cancel";
import { DifficultySelectionComplete } from "./difficulty-selection-complete";
import { EndBattle } from "./end-battle";
import { EndNetworkError } from "./end-network-error";
import { EndNPCEnding } from "./end-npc-ending";
import { ForceEndBattle } from "./force-end-battle";
import { ForceRetry } from "./force-retry";
import { LoginCancel } from "./login-cancel";
import { Logout } from "./logout";
import { MatchingCanceled } from "./matching-canceled";
import { NetBattleCancel } from "./net-battle-cancel";
import { NetBattleStart } from "./net-battle-start";
import { PostBattleAction } from "./post-battle-action";
import { PrivateMatchEntry } from "./private-match-entry";
import { PrivateMatchGuestStart } from "./private-match-guest-start";
import { PrivateMatchHostStart } from "./private-match-host-start";
import { ReloadRequest } from "./reload-request";
import { SelectEpisode } from "./select-episode";
import { SelectionCancel } from "./selection-cancel";
import { SelectionComplete } from "./selection-complete";
import { StoryStart } from "./story-start";
import { SuddenlyBattleEnd } from "./suddenly-battle-end";
import { TutorialCancel } from "./tutorial-cancel";
import { TutorialConsent } from "./tutorial-consent";
import { TutorialStart } from "./tutorial-start";
import { UnhandledRejection } from "./unhandled-rejection";
import { UniversalLogin } from "./universal-login";
import { VisibilityChange } from "./visibility-change";
import { NetworkError } from "./network-error";
import { WithdrawPrivateMatchEntry } from "./withdraw-private-match-entry";

/** ゲーム全体で利用するアクション */
export type GameAction =
  | ReloadRequest
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
  | NetworkError
  | EndNetworkError
  | ConfigChangeStart
  | ConfigChangeComplete
  | ConfigChangeCancel
  | TutorialConsent
  | TutorialStart
  | TutorialCancel
  | StoryStart
  | CancelEpisodeSelect
  | SelectEpisode
  | VisibilityChange
  | ForceEndBattle
  | ForceRetry
  | UnhandledRejection;
