// @flow
import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {emptyResources, fullResourceLoadingFrom, titleResourceLoading,} from "../resource";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import {CssVH} from "../view-port/vh";
import {TDScenes} from "./td-scenes";
import type {Resize} from "../window/resize";
import {resizeStream} from "../window/resize";
import {InterruptScenes} from "./innterrupt-scenes";
import {DOMDialogs} from "./dom-dialogs";
import type {ResourceRoot} from "../resource/resource-root";
import {waitAnimationFrame} from "../wait/wait-animation-frame";
import type {DifficultySelect, NPCBattle, NPCBattleX, PlayingNPCBattle,} from "./in-progress/npc-battle";
import {waitTime} from "../wait/wait-time";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {Player} from "gbraver-burst-core";
import {NPCBattleRoom} from "../npc/npc-battle-room";
import {invisibleFirstView} from "../first-view/first-view-visible";
import type {
  ConfigChangeComplete,
  DifficultySelectionComplete,
  EndBattle,
  EndNetworkError,
  PostBattleAction,
  SelectionComplete,
  WebSocketAPIError,
  WebSocketAPIUnintentionalClose,
} from "./game-actions";
import type {InProgress} from "./in-progress/in-progress";
import type {Stream, Unsubscriber} from "../stream/stream";
import {createStream} from "../stream/stream";
import type {
  Battle as BattleSDK,
  CasualMatch as CasualMatchSDK,
  LoggedInUserDelete,
  LoginCheck,
  Logout,
  MailVerify,
  UniversalLogin,
  UserMailGet,
  UserNameGet,
  UserPictureGet,
  WebsocketDisconnect,
  WebsocketErrorNotifier,
  WebsocketUnintentionalCloseNotifier,
} from '@gbraver-burst-network/browser-core';
import type {CasualMatch} from "./in-progress/casual-match";
import {Title} from "./dom-scenes/title/title";
import {FutureSuddenlyBattleEnd} from "./future-suddenly-battle-end";
import {map} from "../stream/operator";
import type {BattleProgress} from "./td-scenes/battle/battle-progress";
import {configFromLocalStorage, saveConfigToLocalStorage} from "./config/local-storage";
import {DefaultConfig} from "./config/default-config";
import type {BGMManager} from '../bgm/bgm-manager';
import {createBGMManager} from '../bgm/bgm-manager';
import {SOUND_IDS} from "../resource/sound";
import {fadeIn, fadeOut, stop} from "../bgm/bgm-operators";
import {DOMFloaters} from "./dom-floaters/dom-floaters";
import type {NPCBattleStage, NPCBattleState} from "./npc-battle";
import {
  createNPCBattlePlayer,
  getCurrentStage,
  getStageLevel,
  isNPCBattleStageClear,
  startNPCBattle,
  updateNPCBattle
} from "./npc-battle";
import {DefaultStage, DefaultStages, NPCBattleCourses} from "./npc-battle-courses";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons
} from "./dom-floaters/post-battle/post-battle-buttons";
import type {GbraverBurstBrowserConfig} from "./config/browser-config";
import type {SoundResource} from "../resource/sound";

/** 本クラスで利用するAPIサーバの機能 */
interface OwnAPI extends UniversalLogin, LoginCheck, CasualMatchSDK, Logout, LoggedInUserDelete,
  UserNameGet, UserPictureGet, MailVerify, UserMailGet, WebsocketDisconnect, 
  WebsocketErrorNotifier, WebsocketUnintentionalCloseNotifier {}

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
  api: OwnAPI,
};

/** ゲーム全体の管理を行う */
export class Game {
  _isPerformanceStatsVisible: boolean;
  _isServiceWorkerUsed: boolean;
  _howToPlayMovieURL: string;
  _termsOfServiceURL: string;
  _privacyPolicyURL: string;
  _contactURL: string;
  _isAPIServerEnable: boolean;
  _inProgress: InProgress;
  _api: OwnAPI;
  _suddenlyBattleEnd: FutureSuddenlyBattleEnd;
  _resize: Stream<Resize>;
  _vh: CssVH;
  _fader: DOMFader;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _domFloaters: DOMFloaters;
  _tdScenes: TDScenes;
  _resourceRoot: ResourceRoot;
  _resources: Resources;
  _isFullResourceLoaded: boolean;
  _serviceWorker: ?ServiceWorkerRegistration;
  _bgm: BGMManager;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._resourceRoot = param.resourceRoot;
    this._resources = emptyResources(this._resourceRoot);
    this._isFullResourceLoaded = false;
    this._isServiceWorkerUsed = param.isServiceWorkerUsed;
    this._isPerformanceStatsVisible = param.isPerformanceStatsVisible;
    this._howToPlayMovieURL = param.howToPlayMovieURL;
    this._termsOfServiceURL = param.termsOfServiceURL;
    this._privacyPolicyURL = param.privacyPolicyURL;
    this._contactURL = param.contactURL;
    this._isAPIServerEnable = param.isAPIServerEnable;

    this._inProgress = {type: 'None'};
    this._resize = resizeStream();
    this._vh = new CssVH(this._resize);

    this._api = param.api;
    this._suddenlyBattleEnd = new FutureSuddenlyBattleEnd();

    this._fader = new DOMFader();
    this._interruptScenes = new InterruptScenes();
    this._domScenes = new DOMScenes();
    this._domDialogs = new DOMDialogs();
    this._domFloaters = new DOMFloaters();
    this._tdScenes = new TDScenes(this._resize);

    const body = document.body || document.createElement('div');
    const elements = [this._fader.getRootHTMLElement(), this._interruptScenes.getRootHTMLElement(),
      this._domDialogs.getRootHTMLElement(), this._domScenes.getRootHTMLElement(), this._domFloaters.getRootHTMLElement(),
      this._tdScenes.getRendererDOM()];
    elements.forEach(element => {
      body.appendChild(element);
    });

    this._serviceWorker = null;
    this._bgm = createBGMManager();

    const suddenlyBattleEnd = this._suddenlyBattleEnd.stream()
      .chain(map(() => ({type: 'SuddenlyBattleEnd'})));
    const webSocketAPIError = createStream(this._api.websocketErrorNotifier())
      .chain(map(error => ({type: 'WebSocketAPIError', error})))
    const WebSocketAPIUnintentionalClose = createStream(this._api.websocketUnintentionalCloseNotifier())
      .chain(map(error => ({type: 'WebSocketAPIUnintentionalClose', error})));
    const gameActionStreams = [this._tdScenes.gameActionNotifier(), this._domScenes.gameActionNotifier(),
      this._domDialogs.gameActionNotifier(), this._domFloaters.gameActionNotifier(),
      suddenlyBattleEnd, webSocketAPIError, WebSocketAPIUnintentionalClose];
    this._unsubscriber = gameActionStreams.map(v => v.subscribe(action => {
      if (action.type === 'ReloadRequest') { this._onReloadRequest() }
      else if (action.type === 'ExitMailVerifiedIncomplete') { this._onExitMailVerifiedIncomplete() }
      else if (action.type === 'EndBattle') { this._onEndBattle(action) }
      else if (action.type === 'SuddenlyBattleEnd') { this._onSuddenlyEndBattle() }
      else if (action.type === 'PostBattleAction') { this._onPostBattleAction(action) }
      else if (action.type === 'ArcadeStart') { this._onArcadeStart() }
      else if (action.type === 'CasualMatchStart') { this._onCasualMatchStart() }
      else if (action.type === 'MatchingCanceled') { this._onMatchingCanceled() }
      else if (action.type === 'ShowHowToPlay') { this._onShowHowToPlay() }
      else if (action.type === 'SelectionComplete') { this._onSelectionComplete(action) }
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
   * @return 処理結果
   */
  async initialize(): Promise<void> {
    const startTime = Date.now();
    if (this._isPerformanceStatsVisible && document.body) {
      viewPerformanceStats(document.body);
    }
    
    if (this._isServiceWorkerUsed) {
      this._serviceWorker = await loadServiceWorker();
    }

    const [isLogin, isMailVerified] = await Promise.all([this._api.isLogin(), this._api.isMailVerified()]);
    if (isLogin && !isMailVerified) {
      const mailAddress = await this._api.getMail();
      this._domScenes.startMailVerifiedIncomplete(mailAddress);
      invisibleFirstView();
      await this._fader.fadeIn();
      return;
    }

    const resourceLoading = titleResourceLoading(this._resourceRoot);
    this._resources = await resourceLoading.resources;
    const config = configFromLocalStorage() ?? DefaultConfig;
    this._reflectSoundVolume(config);
    const title = await this._startTitle();
    this._interruptScenes.bind(this._resources);
    const latency = Date.now() - startTime;
    await waitTime(500 - latency);
    await this._fader.fadeOut();
    invisibleFirstView();
    await this._fader.fadeIn();
    title.playBGM();
  }

  /**
   * 画面リロード依頼時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onReloadRequest(): Promise<void> {
    await this._fader.fadeOut();
    window.location.reload();
  }

  /**
   * メール認証未完了画面を抜ける時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onExitMailVerifiedIncomplete(): Promise<void> {
    await this._fader.fadeOut();
    await this._api.logout();
  }

  /**
   * アーケードモード開始
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onArcadeStart(): Promise<void> {
    if (!this._isFullResourceLoaded) {
      await this._fullResourceLoading();
    }

    this._inProgress = {type: 'NPCBattle', subFlow: {type: 'PlayerSelect'}};
    await this._fader.fadeOut();
    await this._domScenes.startPlayerSelect(this._resources);
    await this._fader.fadeIn();
  }

  /**
   * カジュアルマッチ開始
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onCasualMatchStart(): Promise<void> {
    const callLoginCheckAPI = async () => {
      try {
        return await this._api.isLogin();
      } catch (e) {
        this._domDialogs.startNetworkError(this._resources, {type: 'Close'});
        throw e;
      }
    };
    const gotoPlayerSelect = async (): Promise<void> => {
      this._inProgress = {type: 'CasualMatch', subFlow: {type: 'PlayerSelect'}};
      this._domDialogs.hidden();
      await this._fader.fadeOut();
      await this._domScenes.startPlayerSelect(this._resources);
      await this._fader.fadeIn();
    };
    const showLoginDialog = () => {
      this._domDialogs.startLogin(this._resources, 'ネット対戦をするにはログインをしてください');
    };

    this._domDialogs.startWaiting('ログインチェック中......');
    const isLogin = await callLoginCheckAPI();
    this._domDialogs.hidden();
    if (!isLogin) {
      showLoginDialog();
      return;
    }

    if (!this._isFullResourceLoaded) {
      await this._fullResourceLoading();
    }

    await gotoPlayerSelect();
  }

  /**
   * マッチング中止
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onMatchingCanceled(): Promise<void> {
    this._domDialogs.startWaiting('通信中......');
    await this._api.disconnectWebsocket();
    this._domDialogs.hidden();
  }

  /**
   * ユニバーサルログイン
   */
  async _onUniversalLogin(): Promise<void> {
    await this._fader.fadeOut();
    await this._api.gotoLoginPage();
  }

  /**
   * ログイン中断
   */
  _onLoginCancel(): void {
    this._domDialogs.hidden();
  }

  /**
   * ログアウト
   * @return 処理が完了したら発火するPromise
   */
  async _onLogout(): Promise<void> {
    await this._fader.fadeOut();
    await this._api.logout();
  }

  /**
   * アカウント削除同意
   */
  _onAccountDeleteConsent(): void {
    this._domDialogs.startDeleteAccountConsent(this._resources);
  }

  /**
   * アカウント削除
   */
  async _onDeleteAccount(): Promise<void> {
    this._domDialogs.startWaiting('アカウント削除中')
    await this._api.deleteLoggedInUser();
    await this._fader.fadeOut();
    await this._api.logout();
  }

  /**
   * アカウント削除キャンセル
   */
  _onCancelAccountDeletion(): void {
    this._domDialogs.hidden();
  }

  /**
   * 遊び方ダイアログ表示
   */
  _onShowHowToPlay() {
    this._bgm.do(fadeOut);
    this._domDialogs.startHowToPlay(this._resources, this._howToPlayMovieURL);
  }

  /**
   * 遊び方ダイアログを閉じる
   */
  _onEndHowToPlay() {
    this._bgm.do(fadeIn)
    this._domDialogs.hidden();
  }

  /**
   * 通信エラーダイアログを閉じる
   *
   * @param action アクション
   */
  async _onEndNetworkError(action: EndNetworkError) {
    const close = async () => {
      this._inProgress = {type: 'None'};
      this._domDialogs.hidden();
    };
    const gotoTitle = async () => {
      this._inProgress = {type: 'None'};
      this._domDialogs.hidden();
      const [title] = await Promise.all([(async () => {
        await this._fader.fadeOut();
        return await this._startTitle();
      })(), (async () => {
        await this._bgm.do(fadeOut);
        await this._bgm.do(stop);
      })()]);
      await this._fader.fadeIn();
      title.playBGM();
    };

    if (action.postNetworkError.type === 'Close') {
      await close();
    } else if (action.postNetworkError.type === 'GotoTitle') {
      await gotoTitle();
    }
  }

  /**
   * プレイヤーキャラクター 選択完了時の処理
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    const courseDifficultySelect = async (npcBattle: NPCBattle): Promise<void> => {
      this._inProgress = {...npcBattle, subFlow: {type: 'DifficultySelect', armdozerId: action.armdozerId, pilotId: action.pilotId}};
      this._domDialogs.startDifficulty(this._resources);
    };
    const waitUntilMatching = async (): Promise<BattleSDK> => {
      try {
        await this._api.disconnectWebsocket();
        return await this._api.startCasualMatch(action.armdozerId, action.pilotId);
      } catch(e) {
        this._domDialogs.startNetworkError(this._resources, {type: 'GotoTitle'});
        throw e;
      }
    };
    const createBattleProgress = (battle: BattleSDK): BattleProgress => ({
      progress: async (v) =>  {
        try {
          this._domDialogs.startWaiting('通信中......');
          const update = await battle.progress(v);
          this._domDialogs.hidden();
          return update;
        } catch(e) {
          this._domDialogs.startNetworkError(this._resources, {type: 'GotoTitle'});
          throw e;
        }
      }
    });
    const startMatching = async (origin: CasualMatch): Promise<void> => {
      this._domDialogs.startMatching(this._resources);
      const battle = await waitUntilMatching();
      this._suddenlyBattleEnd.bind(battle);
      this._inProgress = {...origin, subFlow: {type: 'Battle'}};

      await this._fader.fadeOut();
      this._domDialogs.hidden();
      await this._domScenes.startMatchCard(this._resources, battle.player.armdozer.id, battle.enemy.armdozer.id, 'CASUAL MATCH');
      await this._fader.fadeIn();

      const progress = createBattleProgress(battle);
      const config = configFromLocalStorage() ?? DefaultConfig;
      const battleScene = this._tdScenes.startBattle(this._resources, this._bgm, SOUND_IDS.BATTLE_BGM_01,
        config.webGLPixelRatio, 1 / config.battleAnimationSpeed, progress, battle.player, battle.enemy, battle.initialState);
      await waitAnimationFrame();
      await Promise.all([(async () => {
        await this._fader.fadeOut();
        this._domScenes.hidden();  
      })(), (async () => {
        await this._bgm.do(fadeOut);
        await this._bgm.do(stop);
      })()]);
      await this._fader.fadeIn();
      await battleScene.start();
    };

    if (this._inProgress.type === 'NPCBattle') {
      await courseDifficultySelect(this._inProgress);
    } else if (this._inProgress.type === 'CasualMatch') {
      await startMatching(this._inProgress);
    }
  }

  /**
   * プレイヤー選択がキャンセルされた時のイベント
   * @return 処理結果
   */
  async _onSelectionCancel(): Promise<void> {
    this._inProgress = {type: 'None'};
    await this._fader.fadeOut();
    await this._startTitle();
    await this._fader.fadeIn();
  }

  /**
   * 難易度選択完了時のイベント
   *
   * @param action アクション
   * @return 処理が完了したら発火するPromise
   */
  async _onDifficultySelectionComplete(action: DifficultySelectionComplete): Promise<void> {
    if (!(this._inProgress.type === 'NPCBattle' && this._inProgress.subFlow.type === 'DifficultySelect')) {
      return;
    }

    const npcBattle: NPCBattle = this._inProgress;
    const difficultySelect: DifficultySelect = this._inProgress.subFlow;
    const {armdozerId, pilotId} = difficultySelect;
    const player = createNPCBattlePlayer(armdozerId, pilotId);
    const stages = NPCBattleCourses
      .find(v => v.armdozerId === armdozerId && v.difficulty === action.difficulty)?.stages ?? DefaultStages;
    const npcBattleState = startNPCBattle(player, stages);
    this._inProgress = {...npcBattle, subFlow: {type: 'PlayingNPCBattle', state: npcBattleState}};
    const stage = getCurrentStage(npcBattleState) ?? DefaultStage;
    const level = getStageLevel(npcBattleState);
    await this._startNPCBattleStage(player, stage, level);
  }

  /**
   * 難易度選択キャンセル時のイベント
   */
  _onDifficultySelectionCancel(): void {
    if (!(this._inProgress.type === 'NPCBattle' && this._inProgress.subFlow.type === 'DifficultySelect')) {
      return;
    }

    this._inProgress = {...this._inProgress, subFlow: {type: 'PlayerSelect'}};
    this._domDialogs.hidden();
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    const endNPCBattleStage = async (inProgress: NPCBattleX<PlayingNPCBattle>) => {
      const isStageClear = isNPCBattleStageClear(inProgress.subFlow.state, action.gameEnd.result);
      const updatedState = updateNPCBattle(inProgress.subFlow.state, isStageClear);
      this._inProgress = {...inProgress, subFlow: {...inProgress.subFlow, state: updatedState}};
      if (isStageClear && updatedState.isGameClear) {
        await this._domFloaters.showPostBattle(this._resources, PostNPCBattleComplete);
      } else if (isStageClear) {
        await this._domFloaters.showPostBattle(this._resources, PostNPCBattleWinButtons);
      } else {
        await this._domFloaters.showPostBattle(this._resources, PostNPCBattleLoseButtons);
      }
    };
    const endCasualMatch = async (): Promise<void> => {
      this._suddenlyBattleEnd.unbind();
      await this._api.disconnectWebsocket();
      await this._domFloaters.showPostBattle(this._resources, PostNetworkBattleButtons);
    };

    if (this._inProgress.type === 'NPCBattle' && this._inProgress.subFlow.type === 'PlayingNPCBattle') {
      const playingNPCBattle: PlayingNPCBattle = this._inProgress.subFlow;
      const inProgress = ((this._inProgress: any): NPCBattleX<typeof playingNPCBattle>);
      await endNPCBattleStage(inProgress);
    } else if (this._inProgress.type === 'CasualMatch') {
      await endCasualMatch();
    }
  }

  /**
   * 戦闘終了後アクション決定時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onPostBattleAction(action: PostBattleAction): Promise<void> {
    const gotoTitle = async () => {
      this._inProgress = {type: 'None'};
      this._domFloaters.hiddenPostBattle();
      const [title] = await Promise.all([(async () => {
        await this._fader.fadeOut();
        return await this._startTitle();  
      })(), (async () => {
        await this._bgm.do(fadeOut);
        await this._bgm.do(stop);
      })()]);
      await this._fader.fadeIn();
      title.playBGM();
    };
    const gotoEnding = async () => {
      this._inProgress = {type: 'None'};
      this._domFloaters.hiddenPostBattle();
      await this._fader.fadeOut();
      this._tdScenes.hidden();
      const ending = await this._domScenes.startNPCEnding(this._resources, this._bgm);
      await this._fader.fadeIn();
      ending.playBGM();
    };
    const startNPCBattleStage = async (state: NPCBattleState) => {
      this._domFloaters.hiddenPostBattle();
      const stage = getCurrentStage(state) ?? DefaultStage;
      const level = getStageLevel(state);
      await this._startNPCBattleStage(state.player, stage, level);
    };

    if (action.action.type === 'GotoTitle') {
      await gotoTitle();
    } else if (action.action.type === 'GotoEnding') {
      await gotoEnding();
    } else if (action.action.type === 'NextStage' && this._inProgress.type === 'NPCBattle' && this._inProgress.subFlow.type === 'PlayingNPCBattle') {
      await startNPCBattleStage(this._inProgress.subFlow.state);
    } else if (action.action.type === 'Retry' && this._inProgress.type === 'NPCBattle' && this._inProgress.subFlow.type === 'PlayingNPCBattle') {
      await startNPCBattleStage(this._inProgress.subFlow.state);
    }
  }

  /**
   * バトル強制終了時の処理
   */
  async _onSuddenlyEndBattle(): Promise<void> {
    this._domDialogs.startNetworkError(this._resources, {type: 'GotoTitle'});
    this._suddenlyBattleEnd.unbind();
    await this._api.disconnectWebsocket();
  }

  /**
   * WebSocketAPIエラー時の処理
   *
   * @param action アクション
   */
  _onWebSocketAPIError(action: WebSocketAPIError): void {
    this._domDialogs.startNetworkError(this._resources, {type: 'GotoTitle'});
    throw action;
  }

  /**
   * WebSocketAPI意図しない切断時の処理
   *
   * @param action アクション
   */
  _onWebSocketAPIUnintentionalClose(action: WebSocketAPIUnintentionalClose): void {
    this._domDialogs.startNetworkError(this._resources, {type: 'GotoTitle'});
    throw action;
  }

  /**
   * NPCバトルエンディングが終了した際の処理
   */
  async _onEndNPCEnding(): Promise<void> {
    const [title] = await Promise.all([(async () => {
      await this._fader.fadeOut();
      return await this._startTitle();  
    })(), (async () => {
      await this._bgm.do(fadeOut);
      await this._bgm.do(stop);
    })()]);
    await this._fader.fadeIn();
    title.playBGM();
  }

  /**
   * 設定変更開始時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onConfigChangeStart(): Promise<void> {
    await this._fader.fadeOut();
    const config = configFromLocalStorage() ?? DefaultConfig;
    this._domScenes.startConfig(this._resources, config);
    await this._fader.fadeIn();
  }

  /**
   * 設定変更キャンセル時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onConfigChangeCancel(): Promise<void> {
    await this._fader.fadeOut();
    await this._startTitle();
    await this._fader.fadeIn();
  }

  /**
   * 設定変更完了時の処理
   *
   * @param action
   * @return 処理が完了したら発火するPromise
   */
  async _onConfigChangeComplete(action: ConfigChangeComplete): Promise<void> {
    await this._fader.fadeOut();
    saveConfigToLocalStorage(action.config);
    await this._startTitle();
    await this._fader.fadeIn();
  }

  /**
   * NPCバトルのステージを開始するヘルパーメソッド
   *
   * @param player プレイヤー
   * @param stage NPCバトルステージ
   * @param level ステージレベル
   */
  async _startNPCBattleStage(player: Player, stage: NPCBattleStage, level: number) {
    const npcBattle = new NPCBattleRoom(player, stage.npc);
    await this._fader.fadeOut();
    this._domDialogs.hidden();
    await this._domScenes.startNPCStageTitle(this._resources, level, stage.caption, npcBattle.enemy.armdozer.id);
    await this._fader.fadeIn();

    const startNPCStageTitleTime = Date.now();
    const progress = v => Promise.resolve(npcBattle.progress(v));
    const config = configFromLocalStorage() ?? DefaultConfig;
    const battleScene = this._tdScenes.startBattle(this._resources, this._bgm, stage.bgm, config.webGLPixelRatio, 
      1 / config.battleAnimationSpeed ,{progress}, npcBattle.player, npcBattle.enemy, npcBattle.stateHistory());
    await waitAnimationFrame();
    const latency = Date.now() - startNPCStageTitleTime;
    await waitTime(3000- latency);

    await Promise.all([(async () => {
      await this._fader.fadeOut();
      this._domScenes.hidden();
    })(), (async () => {
      await this._bgm.do(fadeOut);
      await this._bgm.do(stop);
    })()]);
    await this._fader.fadeIn();
    await battleScene.start();
  }

  /**
   * タイトル画面を開始するヘルパーメソッド
   * いかなる場合でもaccount、canCasualMatch、termsOfServiceURL、privacyPolicyURL
   * に同じ値をセットするために、ヘルパーメソッド化した
   *    
   * @return タイトル画面
   */
  async _startTitle(): Promise<Title> {
    const createLoggedInAccount = async () => {
      const [name, pictureURL] = await Promise.all([
        this._api.getUserName(),
        this._api.getUserPictureURL(),
      ]);
      return {type: 'LoggedInAccount', name, pictureURL};
    }

    const isLogin = await this._api.isLogin();
    const account = isLogin ? await createLoggedInAccount() : {type: 'GuestAccount'};
    return this._domScenes.startTitle(this._resources, this._bgm, account, this._isAPIServerEnable,
      this._termsOfServiceURL, this._privacyPolicyURL, this._contactURL);
  }

  /**
   * 全リソース読み込みを行うヘルパー関数
   * リソース読み込み中は専用画面に遷移する
   *
   * @return 処理完了したら発火するPromise 
   */
  async _fullResourceLoading(): Promise<void> {
    await this._fader.fadeOut();
    const resourceLoading = fullResourceLoadingFrom(this._resources);
    this._domScenes.startLoading(resourceLoading.loading);
    await this._fader.fadeIn();
    this._resources = await resourceLoading.resources;
    this._isFullResourceLoaded = true;
  }

  /**
   * 音量設定を音リソースに反映させるヘルパーメソッド
   *
   * @param config 反映するブラウザ設定
   */
  _reflectSoundVolume(config: GbraverBurstBrowserConfig): void {
    const updateBGM = (origin: SoundResource): SoundResource => {
      return {...origin, soundTypeVolume: config.bgmVolume};
    };
    this._resources.sounds.forEach(sound => {
      if (sound.type === 'BGM') {
        updateBGM(sound);
      }
    });
  }
}
