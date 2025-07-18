import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { onAccountDeleteConsent } from "./on-account-delete-consent";
import { onArcadeStart } from "./on-arcade-start";
import { onCancelAccountDeletion } from "./on-cancel-account-deletion";
import { onCancelEpisodeSelect } from "./on-cancel-episode-select";
import { onCasualMatchStart } from "./on-casual-match-start";
import { onConfigChangeCancel } from "./on-config-change-cancel";
import { onConfigChangeComplete } from "./on-config-change-complete";
import { onConfigChangeStart } from "./on-config-change-start";
import { onDeleteAccount } from "./on-delete-account";
import { onDifficultySelectionCancel } from "./on-difficulty-selection-cancel";
import { onDifficultySelectionComplete } from "./on-difficulty-selection-complete";
import { onEndBattle } from "./on-end-battle";
import { onEndNetworkError } from "./on-end-network-error";
import { onEndNPCEnding } from "./on-end-npc-ending";
import { onForceEndBattle } from "./on-force-end-battle";
import { onForceRetry } from "./on-force-retry";
import { onLoginCancel } from "./on-login-cancel";
import { onLogout } from "./on-logout";
import { onMatchingCanceled } from "./on-matching-cancel";
import { onNetBattleCancel } from "./on-net-battle-cancel";
import { onNetBattleStart } from "./on-net-battle-start";
import { onPostBattleAction } from "./on-post-battle";
import { onPrivateMatchEntry } from "./on-private-match-entry";
import { onPrivateMatchGuestStart } from "./on-private-match-guest-start";
import { onPrivateMatchHostStart } from "./on-private-match-host-start";
import { onReloadRequest } from "./on-reload-request";
import { onSelectEpisode } from "./on-select-episode";
import { onSelectionCancel } from "./on-selection-cancel";
import { onSelectionComplete } from "./on-selection-complete";
import { onStoryStart } from "./on-story-start";
import { onSuddenlyBattleEnd } from "./on-suddenly-battle-end";
import { onTutorialConsent } from "./on-tutorial-consent";
import { onTutorialStart } from "./on-tutorial-start";
import { onUnhandledRejection } from "./on-unhandled-rejection";
import { onUniversalLogin } from "./on-universal-login";
import { onVisibilityChange } from "./on-visibility-change";
import { onWebSocketAPIError } from "./on-websocker-api-error";
import { onWithdrawPrivateMatchEntry } from "./on-withdraw-private-match-entry";

/**
 * ゲームアクション発生時の処理
 * @param props ゲームプロパティ
 * @param action 発生したアクション
 */
export function onGameAction(props: GameProps, action: GameAction) {
  switch (action.type) {
    case "ReloadRequest":
      return onReloadRequest({ props, action });
    case "EndBattle":
      return onEndBattle({ props, action });
    case "SuddenlyBattleEnd":
      return onSuddenlyBattleEnd({ props, action });
    case "PostBattleAction":
      return onPostBattleAction({ props, action });
    case "ArcadeStart":
      return onArcadeStart({ props, action });
    case "CasualMatchStart":
      return onCasualMatchStart({ props, action });
    case "MatchingCanceled":
      return onMatchingCanceled({ props, action });
    case "SelectionComplete":
      return onSelectionComplete({ props, action });
    case "SelectionCancel":
      return onSelectionCancel({ props, action });
    case "DifficultySelectionComplete":
      return onDifficultySelectionComplete({ props, action });
    case "DifficultySelectionCancel":
      return onDifficultySelectionCancel({ props, action });
    case "EndNPCEnding":
      return onEndNPCEnding({ props, action });
    case "UniversalLogin":
      return onUniversalLogin({ props, action });
    case "Logout":
      return onLogout({ props, action });
    case "AccountDeleteConsent":
      return onAccountDeleteConsent({ props, action });
    case "DeleteAccount":
      return onDeleteAccount({ props, action });
    case "CancelAccountDeletion":
      return onCancelAccountDeletion({ props, action });
    case "LoginCancel":
      return onLoginCancel({ props, action });
    case "EndNetworkError":
      return onEndNetworkError({ props, action });
    case "WebSocketAPIError":
      return onWebSocketAPIError({ props, action });
    case "ConfigChangeStart":
      return onConfigChangeStart({ props, action });
    case "ConfigChangeCancel":
      return onConfigChangeCancel({ props, action });
    case "ConfigChangeComplete":
      return onConfigChangeComplete({ props, action });
    case "TutorialStart":
      return onTutorialStart({ props, action });
    case "TutorialConsent":
      return onTutorialConsent({ props, action });
    case "StoryStart":
      return onStoryStart({ props, action });
    case "CancelEpisodeSelect":
      return onCancelEpisodeSelect({ props, action });
    case "SelectEpisode":
      return onSelectEpisode({ props, action });
    case "NetBattleStart":
      return onNetBattleStart({ props, action });
    case "NetBattleCancel":
      return onNetBattleCancel({ props, action });
    case "PrivateMatchHostStart":
      return onPrivateMatchHostStart({ props, action });
    case "PrivateMatchGuestStart":
      return onPrivateMatchGuestStart({ props, action });
    case "WithdrawPrivateMatchEntry":
      return onWithdrawPrivateMatchEntry({ props, action });
    case "PrivateMatchEntry":
      return onPrivateMatchEntry({ props, action });
    case "VisibilityChange":
      return onVisibilityChange({ props, action });
    case "ForceEndBattle":
      return onForceEndBattle({ props, action });
    case "ForceRetry":
      return onForceRetry({ props, action });
    case "UnhandledRejection":
      return onUnhandledRejection({ props, action });
  }
}
