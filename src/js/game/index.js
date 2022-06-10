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
import type {Battle as BattleSDK} from '@gbraver-burst-network/browser-core';
import type {CasualMatch} from "./in-progress/casual-match";
import {Title} from "./dom-scenes/title/title";
import {FutureSuddenlyBattleEnd} from "./future-suddenly-battle-end";
import {map} from "../stream/operator";
import type {BattleProgress} from "./td-scenes/battle/battle-progress";
import type {BGMManager} from '../bgm/bgm-manager';
import {createBGMManager} from '../bgm/bgm-manager';
import {howlVolume, SOUND_IDS} from "../resource/sound";
import {fadeIn, fadeOut, stop} from "../bgm/bgm-operators";
import {DOMFloaters} from "./dom-floaters/dom-floaters";
import type {NPCBattleState} from "./npc-battle";
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
import type {GbraverBurstBrowserConfig, GbraverBurstBrowserConfigRepository} from "./config/browser-config";
import {BattleAnimationTimeScales, isSoundConfigChanged, parseBattleAnimationTimeScale} from "./config/browser-config";
import type {GameAPI, GameProps} from "./game-props";
import {startNPCBattleStage} from "./game-procedure/start-npc-battle-stage";

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
    if (this.isPerformanceStatsVisible && document.body) {
      viewPerformanceStats(document.body);
    }
    
    if (this.isServiceWorkerUsed) {
      this.serviceWorker = await loadServiceWorker();
    }

    const [isLogin, isMailVerified] = await Promise.all([this.api.isLogin(), this.api.isMailVerified()]);
    if (isLogin && !isMailVerified) {
      const mailAddress = await this.api.getMail();
      this.domScenes.startMailVerifiedIncomplete(mailAddress);
      invisibleFirstView();
      await this.fader.fadeIn();
      return;
    }

    const resourceLoading = titleResourceLoading(this.resourceRoot);
    this.resources = await resourceLoading.resources;
    const config = await this.config.load();
    this._reflectSoundVolume(config);
    const title = await this._startTitle();
    this.interruptScenes.bind(this.resources);
    const latency = Date.now() - startTime;
    await waitTime(500 - latency);
    await this.fader.fadeOut();
    invisibleFirstView();
    await this.fader.fadeIn();
    title.playBGM();
  }

  /**
   * 画面リロード依頼時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onReloadRequest(): Promise<void> {
    await this.fader.fadeOut();
    window.location.reload();
  }

  /**
   * メール認証未完了画面を抜ける時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onExitMailVerifiedIncomplete(): Promise<void> {
    await this.fader.fadeOut();
    await this.api.logout();
  }

  /**
   * アーケードモード開始
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onArcadeStart(): Promise<void> {
    if (!this.isFullResourceLoaded) {
      await this._fullResourceLoading();
      const config = await this.config.load();
      this._reflectSoundVolume(config);
    }

    this.inProgress = {type: 'NPCBattle', subFlow: {type: 'PlayerSelect'}};
    await this.fader.fadeOut();
    await this.domScenes.startPlayerSelect(this.resources);
    await this.fader.fadeIn();
  }

  /**
   * カジュアルマッチ開始
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onCasualMatchStart(): Promise<void> {
    const callLoginCheckAPI = async () => {
      try {
        return await this.api.isLogin();
      } catch (e) {
        this.domDialogs.startNetworkError(this.resources, {type: 'Close'});
        throw e;
      }
    };
    const gotoPlayerSelect = async (): Promise<void> => {
      this.inProgress = {type: 'CasualMatch', subFlow: {type: 'PlayerSelect'}};
      this.domDialogs.hidden();
      await this.fader.fadeOut();
      await this.domScenes.startPlayerSelect(this.resources);
      await this.fader.fadeIn();
    };
    const showLoginDialog = () => {
      this.domDialogs.startLogin(this.resources, 'ネット対戦をするにはログインをしてください');
    };

    this.domDialogs.startWaiting('ログインチェック中......');
    const isLogin = await callLoginCheckAPI();
    this.domDialogs.hidden();
    if (!isLogin) {
      showLoginDialog();
      return;
    }

    if (!this.isFullResourceLoaded) {
      await this._fullResourceLoading();
      const config = await this.config.load();
      this._reflectSoundVolume(config);
    }

    await gotoPlayerSelect();
  }

  /**
   * マッチング中止
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onMatchingCanceled(): Promise<void> {
    this.domDialogs.startWaiting('通信中......');
    await this.api.disconnectWebsocket();
    this.domDialogs.hidden();
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
   * 遊び方ダイアログ表示
   */
  _onShowHowToPlay() {
    this.bgm.do(fadeOut);
    this.domDialogs.startHowToPlay(this.resources, this.howToPlayMovieURL);
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
        return await this._startTitle();
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
   * プレイヤーキャラクター 選択完了時の処理
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    const courseDifficultySelect = async (npcBattle: NPCBattle): Promise<void> => {
      this.inProgress = {...npcBattle, subFlow: {type: 'DifficultySelect', armdozerId: action.armdozerId, pilotId: action.pilotId}};
      this.domDialogs.startDifficulty(this.resources);
    };
    const waitUntilMatching = async (): Promise<BattleSDK> => {
      try {
        await this.api.disconnectWebsocket();
        return await this.api.startCasualMatch(action.armdozerId, action.pilotId);
      } catch(e) {
        this.domDialogs.startNetworkError(this.resources, {type: 'GotoTitle'});
        throw e;
      }
    };
    const createBattleProgress = (battle: BattleSDK): BattleProgress => ({
      progress: async (v) =>  {
        try {
          this.domDialogs.startWaiting('通信中......');
          const update = await battle.progress(v);
          this.domDialogs.hidden();
          return update;
        } catch(e) {
          this.domDialogs.startNetworkError(this.resources, {type: 'GotoTitle'});
          throw e;
        }
      }
    });
    const startMatching = async (origin: CasualMatch): Promise<void> => {
      this.domDialogs.startMatching(this.resources);
      const battle = await waitUntilMatching();
      this.suddenlyBattleEnd.bind(battle);
      this.inProgress = {...origin, subFlow: {type: 'Battle'}};

      await this.fader.fadeOut();
      this.domDialogs.hidden();
      await this.domScenes.startMatchCard(this.resources, battle.player.armdozer.id, battle.enemy.armdozer.id, 'CASUAL MATCH');
      await this.fader.fadeIn();

      const progress = createBattleProgress(battle);
      const config = await this.config.load();
      const battleScene = this.tdScenes.startBattle(this.resources, this.bgm, SOUND_IDS.BATTLE_BGM_01,
        config.webGLPixelRatio, config.battleAnimationTimeScale, progress, battle.player, battle.enemy, battle.initialState);
      await waitAnimationFrame();
      await Promise.all([(async () => {
        await this.fader.fadeOut();
        this.domScenes.hidden();
      })(), (async () => {
        await this.bgm.do(fadeOut);
        await this.bgm.do(stop);
      })()]);
      await this.fader.fadeIn();
      await battleScene.start();
    };

    if (this.inProgress.type === 'NPCBattle') {
      await courseDifficultySelect(this.inProgress);
    } else if (this.inProgress.type === 'CasualMatch') {
      await startMatching(this.inProgress);
    }
  }

  /**
   * プレイヤー選択がキャンセルされた時のイベント
   * @return 処理結果
   */
  async _onSelectionCancel(): Promise<void> {
    this.inProgress = {type: 'None'};
    await this.fader.fadeOut();
    await this._startTitle();
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
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    const saveAnimationTimeScale = async () => {
      const battleAnimationTimeScale = parseBattleAnimationTimeScale(action.animationTimeScale) ?? BattleAnimationTimeScales[0];
      const origin = await this.config.load();
      const update = {...origin, battleAnimationTimeScale};
      await this.config.save(update);
    };
    const endNPCBattleStage = async (inProgress: NPCBattleX<PlayingNPCBattle>) => {
      const isStageClear = isNPCBattleStageClear(inProgress.subFlow.state, action.gameEnd.result);
      const updatedState = updateNPCBattle(inProgress.subFlow.state, isStageClear);
      this.inProgress = {...inProgress, subFlow: {...inProgress.subFlow, state: updatedState}};
      const postBattleButtons = (() => {
        if (isStageClear && updatedState.isGameClear) {
          return PostNPCBattleComplete;
        } else if (isStageClear) {
          return PostNPCBattleWinButtons;
        } else {
          return PostNPCBattleLoseButtons;
        }
      })();
      await this.domFloaters.showPostBattle(this.resources, postBattleButtons);
    };
    const endCasualMatch = async (): Promise<void> => {
      this.suddenlyBattleEnd.unbind();
      await this.api.disconnectWebsocket();
      await this.domFloaters.showPostBattle(this.resources, PostNetworkBattleButtons);
    };

    await saveAnimationTimeScale();
    if (this.inProgress.type === 'NPCBattle' && this.inProgress.subFlow.type === 'PlayingNPCBattle') {
      const playingNPCBattle: PlayingNPCBattle = this.inProgress.subFlow;
      const inProgress = ((this.inProgress: any): NPCBattleX<typeof playingNPCBattle>);
      await endNPCBattleStage(inProgress);
    } else if (this.inProgress.type === 'CasualMatch') {
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
      this.inProgress = {type: 'None'};
      this.domFloaters.hiddenPostBattle();
      const [title] = await Promise.all([(async () => {
        await this.fader.fadeOut();
        return await this._startTitle();  
      })(), (async () => {
        await this.bgm.do(fadeOut);
        await this.bgm.do(stop);
      })()]);
      await this.fader.fadeIn();
      title.playBGM();
    };
    const gotoEnding = async () => {
      this.inProgress = {type: 'None'};
      this.domFloaters.hiddenPostBattle();
      await this.fader.fadeOut();
      this.tdScenes.hidden();
      const ending = await this.domScenes.startNPCEnding(this.resources, this.bgm);
      await this.fader.fadeIn();
      ending.playBGM();
    };
    const gotoNPCBattleStage = async (state: NPCBattleState) => {
      this.domFloaters.hiddenPostBattle();
      const stage = getCurrentStage(state) ?? DefaultStage;
      const level = getStageLevel(state);
      await startNPCBattleStage(this, state.player, stage, level);
    };

    if (action.action.type === 'GotoTitle') {
      await gotoTitle();
    } else if (action.action.type === 'GotoEnding') {
      await gotoEnding();
    } else if (action.action.type === 'NextStage' && this.inProgress.type === 'NPCBattle' && this.inProgress.subFlow.type === 'PlayingNPCBattle') {
      await gotoNPCBattleStage(this.inProgress.subFlow.state);
    } else if (action.action.type === 'Retry' && this.inProgress.type === 'NPCBattle' && this.inProgress.subFlow.type === 'PlayingNPCBattle') {
      await gotoNPCBattleStage(this.inProgress.subFlow.state);
    }
  }

  /**
   * バトル強制終了時の処理
   */
  async _onSuddenlyEndBattle(): Promise<void> {
    this.domDialogs.startNetworkError(this.resources, {type: 'GotoTitle'});
    this.suddenlyBattleEnd.unbind();
    await this.api.disconnectWebsocket();
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
      return await this._startTitle();  
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
    await this._startTitle();
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
    isSoundConfigChanged(origin, action.config) && this._reflectSoundVolume(action.config);
    await this.config.save(action.config);
    await this._startTitle();
    await this.fader.fadeIn();
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
        this.api.getUserName(),
        this.api.getUserPictureURL(),
      ]);
      return {type: 'LoggedInAccount', name, pictureURL};
    }

    const isLogin = await this.api.isLogin();
    const account = isLogin ? await createLoggedInAccount() : {type: 'GuestAccount'};
    return this.domScenes.startTitle(this.resources, this.bgm, account, this.isAPIServerEnable,
      this.termsOfServiceURL, this.privacyPolicyURL, this.contactURL);
  }

  /**
   * 全リソース読み込みを行うヘルパー関数
   * リソース読み込み中は専用画面に遷移する
   *
   * @return 処理完了したら発火するPromise 
   */
  async _fullResourceLoading(): Promise<void> {
    await this.fader.fadeOut();
    const resourceLoading = fullResourceLoadingFrom(this.resources);
    this.domScenes.startLoading(resourceLoading.loading);
    await this.fader.fadeIn();
    this.resources = await resourceLoading.resources;
    this.isFullResourceLoaded = true;
  }

  /**
   * 音量設定を音リソースに反映させるヘルパーメソッド
   *
   * @param config 反映するブラウザ設定
   */
  _reflectSoundVolume(config: GbraverBurstBrowserConfig): void {
    const getVolume = sound => {
      switch(sound.type) {
        case 'BGM':
          return config.bgmVolume;
        case 'SE':
          return config.seVolume;
        default:
          return sound.volume;
      }
    };

    this.resources.sounds.forEach(sound => {
      sound.volume = getVolume(sound);
      sound.sound.volume(howlVolume(sound));
    });
  }
}