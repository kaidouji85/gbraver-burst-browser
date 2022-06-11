// @flow
import type {Unsubscriber} from "../stream/stream";
import {createStream} from "../stream/stream";
import {map} from "../stream/operator";
import type {GameProps, GamePropsGeneratorParam} from "./game-props";
import {initialize} from "./game-procedure/initialize";
import {onReloadRequest} from "./game-procedure/on-reload-request";
import {onExitMailVerifiedIncomplete} from "./game-procedure/on-exit-mai-verified-incomplete";
import {onEndBattle} from "./game-procedure/on-end-battle";
import {onSuddenlyEndBattle} from "./game-procedure/on-suddenly-battle-end";
import {onPostBattleAction} from "./game-procedure/on-post-battle-action";
import {onArcadeStart} from "./game-procedure/on-arcade-start";
import {onCasualMatchStart} from "./game-procedure/on-casual-match-start";
import {onMatchingCanceled} from "./game-procedure/on-matching-cancel";
import {onShowHowToPlay} from "./game-procedure/on-show-how-to-play";
import {onSelectionComplete} from "./game-procedure/on-selection-complete";
import {onSelectionCancel} from "./game-procedure/on-selection-cancel";
import {onDifficultySelectionComplete} from "./game-procedure/on-difficulty-selection-complete";
import {onDifficultySelectionCancel} from "./game-procedure/on-difficulty-selection-cancel";
import {onEndNPCEnding} from "./game-procedure/on-end-npc-ending";
import {onEndHowToPlay} from "./game-procedure/on-end-how-to-play";
import {onUniversalLogin} from "./game-procedure/on-universal-login";
import {onLogout} from "./game-procedure/on-logout";
import {onAccountDeleteConsent} from "./game-procedure/on-account-delete-consent";
import {onDeleteAccount} from "./game-procedure/on-delete-account";
import {onCancelAccountDeletion} from "./game-procedure/on-cancel-account-deletion";
import {onLoginCancel} from "./game-procedure/on-login-cancel";
import {onEndNetworkError} from "./game-procedure/on-end-network-error";
import {onWebSocketAPIError} from "./game-procedure/on-websocker-api-error";
import {onWebSocketAPIUnintentionalClose} from "./game-procedure/on-web-socket-api-unintentional-close";
import {onConfigChangeStart} from "./game-procedure/on-config-change-start";
import {onConfigChangeCancel} from "./game-procedure/on-config-change-cancel";
import {onConfigChangeComplete} from "./game-procedure/on-config-change-complete";
import {generateGameProps} from "./game-props";

/** コンストラクタのパラメータ */
type Param = GamePropsGeneratorParam;

/** ゲーム管理オブジェクト */
export class Game {
  _props: GameProps;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._props = generateGameProps(param);
    const body = document.body || document.createElement('div');
    const elements = [
      this._props.fader.getRootHTMLElement(),
      this._props.interruptScenes.getRootHTMLElement(),
      this._props.domDialogs.getRootHTMLElement(),
      this._props.domScenes.getRootHTMLElement(),
      this._props.domFloaters.getRootHTMLElement(),
      this._props.tdScenes.getRendererDOM()];
    elements.forEach(element => {
      body.appendChild(element);
    });
    const suddenlyBattleEnd = this._props.suddenlyBattleEnd.stream()
      .chain(map(() => ({type: 'SuddenlyBattleEnd'})));
    const webSocketAPIError = createStream(this._props.api.websocketErrorNotifier())
      .chain(map(error => ({type: 'WebSocketAPIError', error})))
    const WebSocketAPIUnintentionalClose = createStream(this._props.api.websocketUnintentionalCloseNotifier())
      .chain(map(error => ({type: 'WebSocketAPIUnintentionalClose', error})));
    const gameActionStreams = [
      this._props.tdScenes.gameActionNotifier(),
      this._props.domScenes.gameActionNotifier(),
      this._props.domDialogs.gameActionNotifier(),
      this._props.domFloaters.gameActionNotifier(),
      suddenlyBattleEnd,
      webSocketAPIError,
      WebSocketAPIUnintentionalClose
    ];
    this._unsubscriber = gameActionStreams.map(v => v.subscribe(action => {
      if (action.type === 'ReloadRequest') { 
        onReloadRequest(this._props);
      } else if (action.type === 'ExitMailVerifiedIncomplete') {
        onExitMailVerifiedIncomplete(this._props);
      } else if (action.type === 'EndBattle') {
        onEndBattle(this._props, action);
      } else if (action.type === 'SuddenlyBattleEnd') { 
        onSuddenlyEndBattle(this._props);
      } else if (action.type === 'PostBattleAction') { 
        onPostBattleAction(this._props, action);
      } else if (action.type === 'ArcadeStart') {
        onArcadeStart(this._props);
      } else if (action.type === 'CasualMatchStart') {
        onCasualMatchStart(this._props);
      } else if (action.type === 'MatchingCanceled') {
        onMatchingCanceled(this._props);
      } else if (action.type === 'ShowHowToPlay') {
        onShowHowToPlay(this._props);
      } else if (action.type === 'SelectionComplete') {
        onSelectionComplete(this._props, action);
      } else if (action.type === 'SelectionCancel') {
        onSelectionCancel(this._props);
      } else if (action.type === 'DifficultySelectionComplete') {
        onDifficultySelectionComplete(this._props, action);
      } else if (action.type === 'DifficultySelectionCancel') {
        onDifficultySelectionCancel(this._props);
      } else if (action.type === 'EndNPCEnding') {
        onEndNPCEnding(this._props);
      } else if (action.type === 'EndHowToPlay') {
        onEndHowToPlay(this._props);
      } else if (action.type === 'UniversalLogin') {
        onUniversalLogin(this._props);
      } else if (action.type === 'Logout') {
        onLogout(this._props);
      } else if (action.type === 'AccountDeleteConsent') {
        onAccountDeleteConsent(this._props);
      } else if (action.type === 'DeleteAccount') {
        onDeleteAccount(this._props);
      } else if (action.type === 'CancelAccountDeletion') {
        onCancelAccountDeletion(this._props);
      } else if (action.type === 'LoginCancel') {
        onLoginCancel(this._props);
      } else if (action.type === 'EndNetworkError') {
        onEndNetworkError(this._props, action);
      } else if (action.type === 'WebSocketAPIError') {
        onWebSocketAPIError(this._props, action);
      } else if (action.type === 'WebSocketAPIUnintentionalClose') {
        onWebSocketAPIUnintentionalClose(this._props, action);
      } else if (action.type === 'ConfigChangeStart') {
        onConfigChangeStart(this._props);
      } else if (action.type === 'ConfigChangeCancel') {
        onConfigChangeCancel(this._props);
      } else if (action.type === 'ConfigChangeComplete') {
        onConfigChangeComplete(this._props, action);
      }
    }));
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this._props);
  }
}