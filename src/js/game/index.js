// @flow
import {map} from "../stream/operator";
import type {Unsubscriber} from "../stream/stream";
import {createStream} from "../stream/stream";
import {initialize} from "./game-procedure/initialize";
import {onAccountDeleteConsent} from "./game-procedure/on-account-delete-consent";
import {onArcadeStart} from "./game-procedure/on-arcade-start";
import {onCancelAccountDeletion} from "./game-procedure/on-cancel-account-deletion";
import {onCasualMatchStart} from "./game-procedure/on-casual-match-start";
import {onConfigChangeCancel} from "./game-procedure/on-config-change-cancel";
import {onConfigChangeComplete} from "./game-procedure/on-config-change-complete";
import {onConfigChangeStart} from "./game-procedure/on-config-change-start";
import {onDeleteAccount} from "./game-procedure/on-delete-account";
import {onDifficultySelectionCancel} from "./game-procedure/on-difficulty-selection-cancel";
import {onDifficultySelectionComplete} from "./game-procedure/on-difficulty-selection-complete";
import {onEndBattle} from "./game-procedure/on-end-battle";
import {onEndHowToPlay} from "./game-procedure/on-end-how-to-play";
import {onEndNetworkError} from "./game-procedure/on-end-network-error";
import {onEndNPCEnding} from "./game-procedure/on-end-npc-ending";
import {onExitMailVerifiedIncomplete} from "./game-procedure/on-exit-mai-verified-incomplete";
import {onLoginCancel} from "./game-procedure/on-login-cancel";
import {onLogout} from "./game-procedure/on-logout";
import {onMatchingCanceled} from "./game-procedure/on-matching-cancel";
import {onPostBattleAction} from "./game-procedure/on-post-battle-action";
import {onReloadRequest} from "./game-procedure/on-reload-request";
import {onSelectionCancel} from "./game-procedure/on-selection-cancel";
import {onSelectionComplete} from "./game-procedure/on-selection-complete";
import {onShowHowToPlay} from "./game-procedure/on-show-how-to-play";
import {onSuddenlyEndBattle} from "./game-procedure/on-suddenly-battle-end";
import {onTutorialStart} from "./game-procedure/on-tutorial-start";
import {onUniversalLogin} from "./game-procedure/on-universal-login";
import {onWebSocketAPIUnintentionalClose} from "./game-procedure/on-web-socket-api-unintentional-close";
import {onWebSocketAPIError} from "./game-procedure/on-websocker-api-error";
import type {GameProps, GamePropsGeneratorParam} from "./game-props";
import {generateGameProps} from "./game-props";

/** コンストラクタのパラメータ */
type Param = GamePropsGeneratorParam;

/** ゲーム管理オブジェクト */
export class Game {
  #props: GameProps;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#props = generateGameProps(param);
    const body = document.body || document.createElement('div');
    const elements = [
      this.#props.fader.getRootHTMLElement(),
      this.#props.interruptScenes.getRootHTMLElement(),
      this.#props.domDialogs.getRootHTMLElement(),
      this.#props.domScenes.getRootHTMLElement(),
      this.#props.domFloaters.getRootHTMLElement(),
      ...this.#props.tdScenes.getHTMLElements()];
    elements.forEach(element => {
      body.appendChild(element);
    });
    const suddenlyBattleEnd = this.#props.suddenlyBattleEnd.stream()
      .chain(map(() => ({type: 'SuddenlyBattleEnd'})));
    const webSocketAPIError = createStream(this.#props.api.websocketErrorNotifier())
      .chain(map(error => ({type: 'WebSocketAPIError', error})))
    const WebSocketAPIUnintentionalClose = createStream(this.#props.api.websocketUnintentionalCloseNotifier())
      .chain(map(error => ({type: 'WebSocketAPIUnintentionalClose', error})));
    const gameActionStreams = [
      this.#props.tdScenes.gameActionNotifier(),
      this.#props.domScenes.gameActionNotifier(),
      this.#props.domDialogs.gameActionNotifier(),
      this.#props.domFloaters.gameActionNotifier(),
      suddenlyBattleEnd,
      webSocketAPIError,
      WebSocketAPIUnintentionalClose
    ];
    this.#unsubscriber = gameActionStreams.map(v => v.subscribe(action => {
      if (action.type === 'ReloadRequest') { 
        onReloadRequest(this.#props);
      } else if (action.type === 'ExitMailVerifiedIncomplete') {
        onExitMailVerifiedIncomplete(this.#props);
      } else if (action.type === 'EndBattle') {
        onEndBattle(this.#props, action);
      } else if (action.type === 'SuddenlyBattleEnd') { 
        onSuddenlyEndBattle(this.#props);
      } else if (action.type === 'PostBattleAction') { 
        onPostBattleAction(this.#props, action);
      } else if (action.type === 'ArcadeStart') {
        onArcadeStart(this.#props);
      } else if (action.type === 'CasualMatchStart') {
        onCasualMatchStart(this.#props);
      } else if (action.type === 'MatchingCanceled') {
        onMatchingCanceled(this.#props);
      } else if (action.type === 'ShowHowToPlay') {
        onShowHowToPlay(this.#props);
      } else if (action.type === 'SelectionComplete') {
        onSelectionComplete(this.#props, action);
      } else if (action.type === 'SelectionCancel') {
        onSelectionCancel(this.#props);
      } else if (action.type === 'DifficultySelectionComplete') {
        onDifficultySelectionComplete(this.#props, action);
      } else if (action.type === 'DifficultySelectionCancel') {
        onDifficultySelectionCancel(this.#props);
      } else if (action.type === 'EndNPCEnding') {
        onEndNPCEnding(this.#props);
      } else if (action.type === 'EndHowToPlay') {
        onEndHowToPlay(this.#props);
      } else if (action.type === 'UniversalLogin') {
        onUniversalLogin(this.#props);
      } else if (action.type === 'Logout') {
        onLogout(this.#props);
      } else if (action.type === 'AccountDeleteConsent') {
        onAccountDeleteConsent(this.#props);
      } else if (action.type === 'DeleteAccount') {
        onDeleteAccount(this.#props);
      } else if (action.type === 'CancelAccountDeletion') {
        onCancelAccountDeletion(this.#props);
      } else if (action.type === 'LoginCancel') {
        onLoginCancel(this.#props);
      } else if (action.type === 'EndNetworkError') {
        onEndNetworkError(this.#props, action);
      } else if (action.type === 'WebSocketAPIError') {
        onWebSocketAPIError(this.#props, action);
      } else if (action.type === 'WebSocketAPIUnintentionalClose') {
        onWebSocketAPIUnintentionalClose(this.#props, action);
      } else if (action.type === 'ConfigChangeStart') {
        onConfigChangeStart(this.#props);
      } else if (action.type === 'ConfigChangeCancel') {
        onConfigChangeCancel(this.#props);
      } else if (action.type === 'ConfigChangeComplete') {
        onConfigChangeComplete(this.#props, action);
      } else if (action.type === 'TutorialStart') {
        onTutorialStart(this.#props);
      }
    }));
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this.#props);
  }
}