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
import type {DifficultySelect, NPCBattle} from "./in-progress/npc-battle";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {
  ConfigChangeComplete,
  DifficultySelectionComplete,
  EndNetworkError,
  WebSocketAPIError,
  WebSocketAPIUnintentionalClose,
} from "./game-actions";
import type {InProgress} from "./in-progress/in-progress";
import type {Stream, Unsubscriber} from "../stream/stream";
import {createStream} from "../stream/stream";
import {FutureSuddenlyBattleEnd} from "./future-suddenly-battle-end";
import {map} from "../stream/operator";
import type {BGMManager} from '../bgm/bgm-manager';
import {createBGMManager} from '../bgm/bgm-manager';
import {fadeIn, fadeOut, stop} from "../bgm/bgm-operators";
import {DOMFloaters} from "./dom-floaters/dom-floaters";
import {
  createNPCBattlePlayer,
  getCurrentStage,
  getStageLevel,
  startNPCBattle,
} from "./npc-battle";
import {DefaultStage, DefaultStages, NPCBattleCourses} from "./npc-battle-courses";
import type {GbraverBurstBrowserConfigRepository} from "./config/browser-config";
import {isSoundConfigChanged} from "./config/browser-config";
import type {GameAPI, GameProps} from "./game-props";
import {startNPCBattleStage} from "./game-procedure/start-npc-battle-stage";
import {reflectSoundVolume} from "./reflect-sound-volume";
import {startTitle} from "./game-procedure/start-title";
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
      }
      else if (action.type === 'SelectionComplete') {
        onSelectionComplete(this, action);
      }
      else if (action.type === 'SelectionCancel') { this._onSelectionCancel() }
      else if (action.type === 'DifficultySelectionComplete') { this._onDifficultySelectionComplete(action) }
      else if (action.type === 'DifficultySelectionCancel') { this._onDifficultySelectionCancel() }
      else if (action.type === 'EndNPCEnding') { this._onEndNPCEnding() }
      else if (action.type === 'EndHowToPlay') { this._onEndHowToPlay() }
      else if (action.type === 'UniversalLogin') { this._onUniversalLogin() }
      else if (action.type === 'Logout') { this._onLogout() }
      else if (action.type === 'AccountDeleteConsent') { this._onAccountDeleteConsent() }
      else if (action.type === 'DeleteAccount') { this._onDeleteAccount() }
      else if (action.type === 'CancelAccountDeletion') { this._onCancelAccountDeletion() }
      else if (action.type === 'LoginCancel') { this._onLoginCancel() }
      else if (action.type === 'EndNetworkError') { this._onEndNetworkError(action) }
      else if (action.type === 'WebSocketAPIError') { this._onWebSocketAPIError(action) }
      else if (action.type === 'WebSocketAPIUnintentionalClose') { this._onWebSocketAPIUnintentionalClose(action) }
      else if (action.type === 'ConfigChangeStart') { this._onConfigChangeStart() }
      else if (action.type === 'ConfigChangeCancel') { this._onConfigChangeCancel() }
      else if (action.type === 'ConfigChangeComplete') { this._onConfigChangeComplete(action) }
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

  /**
   * ユニバーサルログイン
   */
  async _onUniversalLogin(): Promise<void> {
    await this.fader.fadeOut();
    await this.api.gotoLoginPage();
  }

  /**
   * ログイン中断
   */
  _onLoginCancel(): void {
    this.domDialogs.hidden();
  }

  /**
   * ログアウト
   * @return 処理が完了したら発火するPromise
   */
  async _onLogout(): Promise<void> {
    await this.fader.fadeOut();
    await this.api.logout();
  }

  /**
   * アカウント削除同意
   */
  _onAccountDeleteConsent(): void {
    this.domDialogs.startDeleteAccountConsent(this.resources);
  }

  /**
   * アカウント削除
   */
  async _onDeleteAccount(): Promise<void> {
    this.domDialogs.startWaiting('アカウント削除中')
    await this.api.deleteLoggedInUser();
    await this.fader.fadeOut();
    await this.api.logout();
  }

  /**
   * アカウント削除キャンセル
   */
  _onCancelAccountDeletion(): void {
    this.domDialogs.hidden();
  }

  /**
   * 遊び方ダイアログを閉じる
   */
  _onEndHowToPlay() {
    this.bgm.do(fadeIn)
    this.domDialogs.hidden();
  }

  /**
   * 通信エラーダイアログを閉じる
   *
   * @param action アクション
   */
  async _onEndNetworkError(action: EndNetworkError) {
    const close = async () => {
      this.inProgress = {type: 'None'};
      this.domDialogs.hidden();
    };
    const gotoTitle = async () => {
      this.inProgress = {type: 'None'};
      this.domDialogs.hidden();
      const [title] = await Promise.all([(async () => {
        await this.fader.fadeOut();
        return await startTitle(this);
      })(), (async () => {
        await this.bgm.do(fadeOut);
        await this.bgm.do(stop);
      })()]);
      await this.fader.fadeIn();
      title.playBGM();
    };

    if (action.postNetworkError.type === 'Close') {
      await close();
    } else if (action.postNetworkError.type === 'GotoTitle') {
      await gotoTitle();
    }
  }

  /**
   * プレイヤー選択がキャンセルされた時のイベント
   * @return 処理結果
   */
  async _onSelectionCancel(): Promise<void> {
    this.inProgress = {type: 'None'};
    await this.fader.fadeOut();
    await startTitle(this);
    await this.fader.fadeIn();
  }

  /**
   * 難易度選択完了時のイベント
   *
   * @param action アクション
   * @return 処理が完了したら発火するPromise
   */
  async _onDifficultySelectionComplete(action: DifficultySelectionComplete): Promise<void> {
    if (!(this.inProgress.type === 'NPCBattle' && this.inProgress.subFlow.type === 'DifficultySelect')) {
      return;
    }

    const npcBattle: NPCBattle = this.inProgress;
    const difficultySelect: DifficultySelect = this.inProgress.subFlow;
    const {armdozerId, pilotId} = difficultySelect;
    const player = createNPCBattlePlayer(armdozerId, pilotId);
    const stages = NPCBattleCourses
      .find(v => v.armdozerId === armdozerId && v.difficulty === action.difficulty)?.stages ?? DefaultStages;
    const npcBattleState = startNPCBattle(player, stages);
    this.inProgress = {...npcBattle, subFlow: {type: 'PlayingNPCBattle', state: npcBattleState}};
    const stage = getCurrentStage(npcBattleState) ?? DefaultStage;
    const level = getStageLevel(npcBattleState);
    await startNPCBattleStage(this, player, stage, level);
  }

  /**
   * 難易度選択キャンセル時のイベント
   */
  _onDifficultySelectionCancel(): void {
    if (!(this.inProgress.type === 'NPCBattle' && this.inProgress.subFlow.type === 'DifficultySelect')) {
      return;
    }

    this.inProgress = {...this.inProgress, subFlow: {type: 'PlayerSelect'}};
    this.domDialogs.hidden();
  }

  /**
   * WebSocketAPIエラー時の処理
   *
   * @param action アクション
   */
  _onWebSocketAPIError(action: WebSocketAPIError): void {
    this.domDialogs.startNetworkError(this.resources, {type: 'GotoTitle'});
    throw action;
  }

  /**
   * WebSocketAPI意図しない切断時の処理
   *
   * @param action アクション
   */
  _onWebSocketAPIUnintentionalClose(action: WebSocketAPIUnintentionalClose): void {
    this.domDialogs.startNetworkError(this.resources, {type: 'GotoTitle'});
    throw action;
  }

  /**
   * NPCバトルエンディングが終了した際の処理
   */
  async _onEndNPCEnding(): Promise<void> {
    const [title] = await Promise.all([(async () => {
      await this.fader.fadeOut();
      return await startTitle(this);
    })(), (async () => {
      await this.bgm.do(fadeOut);
      await this.bgm.do(stop);
    })()]);
    await this.fader.fadeIn();
    title.playBGM();
  }

  /**
   * 設定変更開始時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onConfigChangeStart(): Promise<void> {
    await this.fader.fadeOut();
    const config = await this.config.load();
    this.domScenes.startConfig(this.resources, config);
    await this.fader.fadeIn();
  }

  /**
   * 設定変更キャンセル時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onConfigChangeCancel(): Promise<void> {
    await this.fader.fadeOut();
    await startTitle(this);
    await this.fader.fadeIn();
  }

  /**
   * 設定変更完了時の処理
   *
   * @param action
   * @return 処理が完了したら発火するPromise
   */
  async _onConfigChangeComplete(action: ConfigChangeComplete): Promise<void> {
    await this.fader.fadeOut();
    const origin = await this.config.load();
    isSoundConfigChanged(origin, action.config) && reflectSoundVolume(this.resources, action.config);
    await this.config.save(action.config);
    await startTitle(this);
    await this.fader.fadeIn();
  }
}