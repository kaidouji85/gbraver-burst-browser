import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { GameActionListener } from "./game-action-listener";
import { onAccountDeleteConsent } from "./on-account-delete-consent";
import { arcadeStartContainer } from "./on-arcade-start";
import { onCancelAccountDeletion } from "./on-cancel-account-deletion";
import { onCancelTutorialSelect } from "./on-cancel-tutorial-select";
import { casualMatchStartContainer } from "./on-casual-match-start";
import { onConfigChangeCancel } from "./on-config-change-cancel";
import { onConfigChangeComplete } from "./on-config-change-complete";
import { onConfigChangeStart } from "./on-config-change-start";
import { onDeleteAccount } from "./on-delete-account";
import { onDifficultySelectionCancel } from "./on-difficulty-selection-cancel";
import { difficultySelectionCompleteContainer } from "./on-difficulty-selection-complete";
import { endBattleContainer } from "./on-end-battle";
import { onEndNetworkError } from "./on-end-network-error";
import { onEndNPCEnding } from "./on-end-npc-ending";
import { exitMailVerifiedIncompleteContainer } from "./on-exit-mai-verified-incomplete";
import { onLoginCancel } from "./on-login-cancel";
import { onLogout } from "./on-logout";
import { matchingCanceledContainer } from "./on-matching-cancel";
import { onNetBattleCancel } from "./on-net-battle-cancel";
import { onNetBattleStart } from "./on-net-battle-start";
import { postBattleActionContainer } from "./on-post-battle";
import { onPrivateMatchEntry } from "./on-private-match-entry";
import { onPrivateMatchGuestStart } from "./on-private-match-guest-start";
import { onPrivateMatchHostStart } from "./on-private-match-host-start";
import { reloadRequestContainer } from "./on-reload-request";
import { onSelectEpisode } from "./on-select-episode";
import { selectionCancelContainer } from "./on-selection-cancel";
import { selectionCompleteContainer } from "./on-selection-complete";
import { onStoryStart } from "./on-story-start";
import { suddenlyBattleEndContainer } from "./on-suddenly-battle-end";
import { onUniversalLogin } from "./on-universal-login";
import { onVisibilityChange } from "./on-visibility-change";
import { onWebSocketAPIError } from "./on-websocker-api-error";
import { onWithdrawPrivateMatchEntry } from "./on-withdraw-private-match-entry";

/** ゲームアクションリスナーをあつめたもの */
const gameActionListeners: { [key in string]: GameActionListener } = {
  ...reloadRequestContainer,
  ...exitMailVerifiedIncompleteContainer,
  ...endBattleContainer,
  ...suddenlyBattleEndContainer,
  ...postBattleActionContainer,
  ...arcadeStartContainer,
  ...casualMatchStartContainer,
  ...matchingCanceledContainer,
  ...selectionCompleteContainer,
  ...selectionCancelContainer,
  ...difficultySelectionCompleteContainer,
};

/**
 * ゲームアクション発生時の処理
 * @param props ゲームプロパティ
 * @param action 発生したアクション
 */
export function onGameAction(props: GameProps, action: GameAction) {
  gameActionListeners[action.type]?.(props, action);

  if (action.type === "DifficultySelectionCancel") {
    onDifficultySelectionCancel(props);
  } else if (action.type === "EndNPCEnding") {
    onEndNPCEnding(props);
  } else if (action.type === "UniversalLogin") {
    onUniversalLogin(props);
  } else if (action.type === "Logout") {
    onLogout(props);
  } else if (action.type === "AccountDeleteConsent") {
    onAccountDeleteConsent(props);
  } else if (action.type === "DeleteAccount") {
    onDeleteAccount(props);
  } else if (action.type === "CancelAccountDeletion") {
    onCancelAccountDeletion(props);
  } else if (action.type === "LoginCancel") {
    onLoginCancel(props);
  } else if (action.type === "EndNetworkError") {
    onEndNetworkError(props, action);
  } else if (action.type === "WebSocketAPIError") {
    onWebSocketAPIError(props, action);
  } else if (action.type === "ConfigChangeStart") {
    onConfigChangeStart(props);
  } else if (action.type === "ConfigChangeCancel") {
    onConfigChangeCancel(props);
  } else if (action.type === "ConfigChangeComplete") {
    onConfigChangeComplete(props, action);
  } else if (action.type === "StoryStart") {
    onStoryStart(props);
  } else if (action.type === "CancelTutorialSelect") {
    onCancelTutorialSelect(props);
  } else if (action.type === "SelectEpisode") {
    onSelectEpisode(props, action);
  } else if (action.type === "NetBattleStart") {
    onNetBattleStart(props);
  } else if (action.type === "NetBattleCancel") {
    onNetBattleCancel(props);
  } else if (action.type === "PrivateMatchHostStart") {
    onPrivateMatchHostStart(props);
  } else if (action.type === "PrivateMatchGuestStart") {
    onPrivateMatchGuestStart(props);
  } else if (action.type === "WithdrawPrivateMatchEntry") {
    onWithdrawPrivateMatchEntry(props);
  } else if (action.type === "PrivateMatchEntry") {
    onPrivateMatchEntry(props, action);
  } else if (action.type === "VisibilityChange") {
    onVisibilityChange();
  }
}
