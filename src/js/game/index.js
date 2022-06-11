// @flow
import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {emptyResources} from "../resource";
import {CssVH} from "../view-port/vh";
import {TDScenes} from "./td-scenes";
import type {Resize} from "../window/resize";
import {resizeStream} from "../window/resize";
import {InterruptScenes} from "./innterrupt-scenes";
import {DOMDialogs} from "./dom-dialogs";
import type {ResourceRoot} from "../resource/resource-root";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {InProgress} from "./in-progress/in-progress";
import type {Stream, Unsubscriber} from "../stream/stream";
import {createStream} from "../stream/stream";
import {FutureSuddenlyBattleEnd} from "./future-suddenly-battle-end";
import {map} from "../stream/operator";
import type {BGMManager} from '../bgm/bgm-manager';
import {createBGMManager} from '../bgm/bgm-manager';
import {DOMFloaters} from "./dom-floaters/dom-floaters";
import type {GbraverBurstBrowserConfigRepository} from "./config/browser-config";
import type {GameAPI, GameProps} from "./game-props";
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

/** コンストラクタのパラメータ */
type Param = {
  /** リソースルート */
  resourceRoot: ResourceRoot,
  /** 遊び方動画のURL */
  howToPlayMovieURL: string,
  /** 利用規約ページのURL */
  termsOfServiceURL: string,
  /** 問い合わせページのURL */
  contactURL: string,
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string,
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean,
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean,
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean,
  /** APIサーバのSDK */
  api: GameAPI,
  /** ブラウザ設定リポジトリ */
  config: GbraverBurstBrowserConfigRepository
};

/** ゲーム管理オブジェクト */
export class Game implements GameProps {
  isPerformanceStatsVisible: boolean;
  isServiceWorkerUsed: boolean;
  howToPlayMovieURL: string;
  termsOfServiceURL: string;
  privacyPolicyURL: string;
  contactURL: string;
  isAPIServerEnable: boolean;
  inProgress: InProgress;
  api: GameAPI;
  config: GbraverBurstBrowserConfigRepository;
  suddenlyBattleEnd: FutureSuddenlyBattleEnd;
  resize: Stream<Resize>;
  vh: CssVH;
  fader: DOMFader;
  interruptScenes: InterruptScenes;
  domScenes: DOMScenes;
  domDialogs: DOMDialogs;
  domFloaters: DOMFloaters;
  tdScenes: TDScenes;
  resourceRoot: ResourceRoot;
  resources: Resources;
  isFullResourceLoaded: boolean;
  serviceWorker: ?ServiceWorkerRegistration;
  bgm: BGMManager;
  unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.resourceRoot = param.resourceRoot;
    this.resources = emptyResources(this.resourceRoot);
    this.isFullResourceLoaded = false;
    this.isServiceWorkerUsed = param.isServiceWorkerUsed;
    this.isPerformanceStatsVisible = param.isPerformanceStatsVisible;
    this.howToPlayMovieURL = param.howToPlayMovieURL;
    this.termsOfServiceURL = param.termsOfServiceURL;
    this.privacyPolicyURL = param.privacyPolicyURL;
    this.contactURL = param.contactURL;
    this.isAPIServerEnable = param.isAPIServerEnable;

    this.inProgress = {type: 'None'};
    this.resize = resizeStream();
    this.vh = new CssVH(this.resize);

    this.api = param.api;
    this.config = param.config;
    this.suddenlyBattleEnd = new FutureSuddenlyBattleEnd();

    this.fader = new DOMFader();
    this.interruptScenes = new InterruptScenes();
    this.domScenes = new DOMScenes();
    this.domDialogs = new DOMDialogs();
    this.domFloaters = new DOMFloaters();
    this.tdScenes = new TDScenes(this.resize);

    const body = document.body || document.createElement('div');
    const elements = [this.fader.getRootHTMLElement(), this.interruptScenes.getRootHTMLElement(),
      this.domDialogs.getRootHTMLElement(), this.domScenes.getRootHTMLElement(), this.domFloaters.getRootHTMLElement(),
      this.tdScenes.getRendererDOM()];
    elements.forEach(element => {
      body.appendChild(element);
    });

    this.serviceWorker = null;
    this.bgm = createBGMManager();

    const suddenlyBattleEnd = this.suddenlyBattleEnd.stream()
      .chain(map(() => ({type: 'SuddenlyBattleEnd'})));
    const webSocketAPIError = createStream(this.api.websocketErrorNotifier())
      .chain(map(error => ({type: 'WebSocketAPIError', error})))
    const WebSocketAPIUnintentionalClose = createStream(this.api.websocketUnintentionalCloseNotifier())
      .chain(map(error => ({type: 'WebSocketAPIUnintentionalClose', error})));
    const gameActionStreams = [this.tdScenes.gameActionNotifier(), this.domScenes.gameActionNotifier(),
      this.domDialogs.gameActionNotifier(), this.domFloaters.gameActionNotifier(),
      suddenlyBattleEnd, webSocketAPIError, WebSocketAPIUnintentionalClose];
    this.unsubscriber = gameActionStreams.map(v => v.subscribe(action => {
      if (action.type === 'ReloadRequest') { 
        onReloadRequest(this);
      } else if (action.type === 'ExitMailVerifiedIncomplete') {
        onExitMailVerifiedIncomplete(this);
      } else if (action.type === 'EndBattle') {
        onEndBattle(this, action);
      } else if (action.type === 'SuddenlyBattleEnd') { 
        onSuddenlyEndBattle(this);
      } else if (action.type === 'PostBattleAction') { 
        onPostBattleAction(this, action);
      } else if (action.type === 'ArcadeStart') {
        onArcadeStart(this);
      } else if (action.type === 'CasualMatchStart') {
        onCasualMatchStart(this);
      } else if (action.type === 'MatchingCanceled') {
        onMatchingCanceled(this);
      } else if (action.type === 'ShowHowToPlay') {
        onShowHowToPlay(this);
      } else if (action.type === 'SelectionComplete') {
        onSelectionComplete(this, action);
      } else if (action.type === 'SelectionCancel') {
        onSelectionCancel(this);
      } else if (action.type === 'DifficultySelectionComplete') {
        onDifficultySelectionComplete(this, action);
      } else if (action.type === 'DifficultySelectionCancel') {
        onDifficultySelectionCancel(this);
      } else if (action.type === 'EndNPCEnding') {
        onEndNPCEnding(this);
      } else if (action.type === 'EndHowToPlay') {
        onEndHowToPlay(this);
      } else if (action.type === 'UniversalLogin') {
        onUniversalLogin(this);
      } else if (action.type === 'Logout') {
        onLogout(this);
      } else if (action.type === 'AccountDeleteConsent') {
        onAccountDeleteConsent(this);
      } else if (action.type === 'DeleteAccount') {
        onDeleteAccount(this);
      } else if (action.type === 'CancelAccountDeletion') {
        onCancelAccountDeletion(this);
      } else if (action.type === 'LoginCancel') {
        onLoginCancel(this);
      } else if (action.type === 'EndNetworkError') {
        onEndNetworkError(this, action);
      } else if (action.type === 'WebSocketAPIError') {
        onWebSocketAPIError(this, action);
      } else if (action.type === 'WebSocketAPIUnintentionalClose') {
        onWebSocketAPIUnintentionalClose(this, action);
      } else if (action.type === 'ConfigChangeStart') {
        onConfigChangeStart(this);
      } else if (action.type === 'ConfigChangeCancel') {
        onConfigChangeCancel(this);
      } else if (action.type === 'ConfigChangeComplete') {
        onConfigChangeComplete(this, action);
      }
    }));
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理が完了したら発火するPromise
   */
  async initialize(): Promise<void> {
    await initialize(this);
  }
}