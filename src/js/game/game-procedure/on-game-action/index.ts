import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { GameActionListener } from "./game-action-listener";
import { accountDeleteConsentContainer } from "./on-account-delete-consent";
import { arcadeStartContainer } from "./on-arcade-start";
import { cancelAccountDeletionContainer } from "./on-cancel-account-deletion";
import { cancelTutorialSelectContainer } from "./on-cancel-tutorial-select";
import { casualMatchStartContainer } from "./on-casual-match-start";
import { configChangeCancelContainer } from "./on-config-change-cancel";
import { configChangeCompleteContainer } from "./on-config-change-complete";
import { configChangeStartContainer } from "./on-config-change-start";
import { deleteAccountContainer } from "./on-delete-account";
import { difficultySelectionCancelContainer } from "./on-difficulty-selection-cancel";
import { difficultySelectionCompleteContainer } from "./on-difficulty-selection-complete";
import { endBattleContainer } from "./on-end-battle";
import { endNetworkErrorContainer } from "./on-end-network-error";
import { endNPCEndingContainer } from "./on-end-npc-ending";
import { loginCancelContainer } from "./on-login-cancel";
import { logoutContainer } from "./on-logout";
import { matchingCanceledContainer } from "./on-matching-cancel";
import { netBattleCancelContainer } from "./on-net-battle-cancel";
import { netBattleStartContainer } from "./on-net-battle-start";
import { postBattleActionContainer } from "./on-post-battle";
import { privateMatchEntryContainer } from "./on-private-match-entry";
import { privateMatchGuestStartContainer } from "./on-private-match-guest-start";
import { privateMatchHostStartContainer } from "./on-private-match-host-start";
import { reloadRequestContainer } from "./on-reload-request";
import { selectEpisodeContainer } from "./on-select-episode";
import { selectionCancelContainer } from "./on-selection-cancel";
import { selectionCompleteContainer } from "./on-selection-complete";
import { storyStartContainer } from "./on-story-start";
import { suddenlyBattleEndContainer } from "./on-suddenly-battle-end";
import { universalLoginContainer } from "./on-universal-login";
import { visibilityChangeContainer } from "./on-visibility-change";
import { webSocketAPIErrorContainer } from "./on-websocker-api-error";
import { withdrawPrivateMatchEntryContainer } from "./on-withdraw-private-match-entry";

/** ゲームアクションリスナーをあつめたもの */
const gameActionListeners: { [key in string]: GameActionListener } = {
  ...reloadRequestContainer,
  ...endBattleContainer,
  ...suddenlyBattleEndContainer,
  ...postBattleActionContainer,
  ...arcadeStartContainer,
  ...casualMatchStartContainer,
  ...matchingCanceledContainer,
  ...selectionCompleteContainer,
  ...selectionCancelContainer,
  ...difficultySelectionCompleteContainer,
  ...difficultySelectionCancelContainer,
  ...endNPCEndingContainer,
  ...universalLoginContainer,
  ...logoutContainer,
  ...accountDeleteConsentContainer,
  ...deleteAccountContainer,
  ...cancelAccountDeletionContainer,
  ...loginCancelContainer,
  ...endNetworkErrorContainer,
  ...webSocketAPIErrorContainer,
  ...configChangeStartContainer,
  ...configChangeCancelContainer,
  ...configChangeCompleteContainer,
  ...storyStartContainer,
  ...cancelTutorialSelectContainer,
  ...selectEpisodeContainer,
  ...netBattleStartContainer,
  ...netBattleCancelContainer,
  ...privateMatchHostStartContainer,
  ...privateMatchGuestStartContainer,
  ...withdrawPrivateMatchEntryContainer,
  ...privateMatchEntryContainer,
  ...visibilityChangeContainer,
};

/**
 * ゲームアクション発生時の処理
 * @param props ゲームプロパティ
 * @param action 発生したアクション
 */
export function onGameAction(props: GameProps, action: GameAction) {
  gameActionListeners[action.type]?.(props, action);
}
