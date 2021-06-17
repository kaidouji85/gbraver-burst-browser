// @flow

import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {ResourceLoader} from "../resource";
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
import type {NPCBattle} from "./in-progress/npc-battle/npc-battle";
import {createInitialNPCBattle, createNPCBattlePlayer, findCourse, isNPCBattleEnd, levelUpOrNot} from "./in-progress/npc-battle/npc-battle";
import {waitTime} from "../wait/wait-time";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {Player} from "gbraver-burst-core";
import type {NPCBattleCourse} from "./in-progress/npc-battle/npc-battle-course";
import {startOfflineBattle} from "../battle/offline-battle";
import {invisibleFirstView} from "../first-view/first-view-visible";
import type {EndBattle, SelectionComplete} from "./actions/game-actions";
import type {InProgress} from "./in-progress/in-progress";
import type {Stream, Unsubscriber} from "../stream/core";
import type {IdPasswordLogin, LoginCheck} from '@gbraver-burst-network/core';
import type {CasualMatch} from "./in-progress/casual-match/casual-match";

/** 本クラスで利用するAPIサーバの機能 */
interface OwnAPI extends IdPasswordLogin, LoginCheck {}

/** コンストラクタのパラメータ */
type Param = {
  /** リソースルート */
  resourceRoot: ResourceRoot,
  /** 遊び方動画のURL */
  howToPlayMovieURL: string,
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean,
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean,
  /** カジュアルマッチが可能か否か、trueで可能 */
  canCasualMatch: boolean,
  /** APIサーバのSDK */
  api: OwnAPI,
};

/** ゲーム全体の管理を行う */
export class Game {
  _isPerformanceStatsVisible: boolean;
  _isServiceWorkerUsed: boolean;
  _howToPlayMovieURL: string;
  _canCasualMatch: boolean;
  _inProgress: InProgress;
  _api: OwnAPI;
  _resize: Stream<Resize>;
  _vh: CssVH;
  _fader: DOMFader;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resourceRoot: ResourceRoot;
  _resources: ?Resources;
  _serviceWorker: ?ServiceWorkerRegistration;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._resourceRoot = param.resourceRoot;
    this._isServiceWorkerUsed = param.isServiceWorkerUsed;
    this._isPerformanceStatsVisible = param.isPerformanceStatsVisible;
    this._howToPlayMovieURL = param.howToPlayMovieURL;
    this._canCasualMatch = param.canCasualMatch;

    this._inProgress = {type: 'None'};
    this._resize = resizeStream();
    this._vh = new CssVH(this._resize);
    this._api = param.api;

    this._fader = new DOMFader();

    this._interruptScenes = new InterruptScenes();
    this._domScenes = new DOMScenes();
    this._domDialogs = new DOMDialogs();
    this._tdScenes = new TDScenes(this._resize);

    const body = document.body || document.createElement('div');
    const elements = [
      this._fader.getRootHTMLElement(),
      this._interruptScenes.getRootHTMLElement(),
      this._domDialogs.getRootHTMLElement(),
      this._domScenes.getRootHTMLElement(),
      this._tdScenes.getRendererDOM(),
    ];
    elements.forEach(element => {
      body.appendChild(element);
    });

    this._resources = null;
    this._serviceWorker = null;

    const gameActionStreams = [
      this._tdScenes.gameActionNotifier(),
      this._domScenes.gameActionNotifier(),
      this._domDialogs.gameActionNotifier()
    ];
    this._unsubscriber = gameActionStreams.map(v => v.subscribe(action => {
      if (action.type === 'EndBattle') {
        this._onEndBattle(action);
      } else if (action.type === 'GameStart') {
        this._onGameStart();
      } else if (action.type === 'CasualMatchStart') {
        this._onCasualMatchStart();
      } else if (action.type === 'ShowHowToPlay') {
        this._onShowHowToPlay();
      } else if (action.type === 'SelectionComplete') {
        this._onSelectionComplete(action);
      } else if (action.type === 'SelectionCancel') {
        this._onSelectionCancel();
      }else if (action.type === 'EndNPCEnding') {
        this._onEndNPCEnding();
      } else if (action.type === 'EndHowToPlay') {
        this._onEndHowToPlay();
      } else if (action.type === 'LoginCancel') {
        this._onLoginCancel();
      } else if (action.type === 'LoginSuccess') {
        this._onLoginSuccess();
      }
    }));
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理結果
   */
  async initialize(): Promise<void> {
    if (this._isPerformanceStatsVisible && document.body) {
      viewPerformanceStats(document.body);
    }
    
    if (this._isServiceWorkerUsed) {
      this._serviceWorker = await loadServiceWorker();
    }

    const loader = new ResourceLoader(this._resourceRoot);
    invisibleFirstView();
    this._domScenes.startLoading(loader.progress());
    await this._fader.fadeIn();
    const resources: Resources = await loader.load();
    this._resources = resources;
    await waitAnimationFrame();
    await waitTime(1000);

    await this._fader.fadeOut();
    await this._domScenes.startTitle(resources, this._canCasualMatch);
    this._interruptScenes.bind(resources);
    await this._fader.fadeIn();
  }

  /**
   * ゲームスタート時の処理
   */
  async _onGameStart() {
    if (!this._resources) {
      return;
    }
    const resources: Resources = this._resources;

    this._inProgress = createInitialNPCBattle();
    await this._fader.fadeOut();
    await this._domScenes.startPlayerSelect(resources);
    await this._fader.fadeIn();
  }

  /**
   * カジュアルマッチ開始
   */
  async _onCasualMatchStart(): Promise<void> {
    const isLogin = await this._api.isLogin();
    if (isLogin) {
      this._startCasualMatchWithLogin();
    } else {
      this._startCasualMathWithoutLogin();
    }
  }

  /**
   * ログインしている状態でカジュアルマッチを開始した
   */
  async _startCasualMatchWithLogin(): Promise<void> {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const subFlow = {type: 'PlayerSelect'};
    this._inProgress = {type: 'CasualMatch', subFlow};
    this._domDialogs.hidden();
    await this._fader.fadeOut();
    await this._domScenes.startPlayerSelect(resources);
    await this._fader.fadeIn();
  }

  /**
   * ログインなしでカジュアルマッチを開始した
   */
  _startCasualMathWithoutLogin(): void {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const subFlow = {type: 'Login'};
    this._inProgress = {type: 'CasualMatch', subFlow};
    const caption = 'カジュアルマッチを始めるにはログインする必要があります';
    this._domDialogs.startLogin(resources, this._api, caption);
  }

  /**
   * ログイン中断
   */
  _onLoginCancel(): void {
    this._domDialogs.hidden();
  }

  /**
   * ログイン成功
   */
  _onLoginSuccess(): void {
    if (this._inProgress.type === 'CasualMatch') {
      const casualMatch: CasualMatch = this._inProgress;
      this._casualMatchLoginSuccess(casualMatch);
    }
  }

  /**
   * カジュアルマッチ開始時のログインに成功した
   *
   * @param casualMath カジュアルマッチ情報
   * @return 処理が完了したら発火するPromise
   */
  async _casualMatchLoginSuccess(casualMath: CasualMatch): Promise<void> {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const subFlow = {type: 'PlayerSelect'};
    this._inProgress = {...casualMath, subFlow};
    this._domDialogs.hidden();
    await this._fader.fadeOut();
    await this._domScenes.startPlayerSelect(resources);
    await this._fader.fadeIn();
  }

  /**
   * 遊び方ダイアログ表示
   */
  _onShowHowToPlay() {
    if (!this._resources) {
      return;
    }
    this._domDialogs.startHowToPlay(this._resources, this._howToPlayMovieURL);
  }

  /**
   * 遊び方シーン終了
   */
  _onEndHowToPlay() {
    this._domDialogs.hidden();
  }

  /**
   * プレイヤーキャラクター 選択完了時の処理
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    if ((this._inProgress.type === 'NPCBattle') && this._resources) {
      const resources: Resources = this._resources;
      const origin: NPCBattle = this._inProgress;
      const player = createNPCBattlePlayer(action);
      const updated = {...origin, player};
      const course = findCourse(updated);
      this._inProgress = updated;
      await this._startNPCBattleCrce(resources, player, course);
    }
  }

  /**
   * プレイヤー選択がキャンセルされた時のイベント
   * @return 処理結果
   */
  async _onSelectionCancel(): Promise<void> {
    if (!this._resources) {
      return;
    }
    const resources: Resources = this._resources;

    this._inProgress = {type: 'None'};
    await this._fader.fadeOut();
    await this._domScenes.startTitle(resources, this._canCasualMatch);
    await this._fader.fadeIn();
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    if ((this._inProgress.type === 'NPCBattle') && !isNPCBattleEnd(this._inProgress, action) && this._inProgress.player && this._resources) {
      const resources: Resources = this._resources;
      const player: Player = this._inProgress.player;
      const origin: NPCBattle = this._inProgress;
      const updated: NPCBattle = levelUpOrNot(origin, action);
      const course = findCourse(updated);   
      this._inProgress = updated;
      await this._startNPCBattleCrce(resources, player, course);
      return;
    } 
    
    if ((this._inProgress.type === 'NPCBattle') && isNPCBattleEnd(this._inProgress, action) && this._resources) {
      const resources: Resources = this._resources;
      this._inProgress = {type: 'None'};
      await this._fader.fadeOut();
      this._tdScenes.hidden();
      await this._domScenes.startNPCEnding(resources);
      await this._fader.fadeIn();
      return;
    }
  }

  /**
   * NPC戦闘エンディングが終了した際の処理
   */
  async _onEndNPCEnding(): Promise<void> {
    if (!this._resources) {
      return;
    }
    const resources: Resources = this._resources;

    await this._fader.fadeOut();
    await this._domScenes.startTitle(resources, this._canCasualMatch);
    await this._fader.fadeIn();
  }

  /**
   * NPCバトルコースを開始する
   * 
   * @param resources リソース管理オブジェクト
   * @param player プレイヤー
   * @param cource NPCバトルコース
   */
  async _startNPCBattleCrce(resources: Resources, player: Player, course: NPCBattleCourse) {
    const battle = startOfflineBattle(player, course.npc);
      
    await this._fader.fadeOut();
    await this._domScenes.startMatchCard(resources, player.armdozer.id, course.npc.armdozer.id, course.stageName);
    await this._fader.fadeIn();
    
    const battleScene = this._tdScenes.startBattle(resources, battle.progress, battle.player, battle.enemy, battle.initialState);
    await waitAnimationFrame();
    await this._fader.fadeOut();
    this._domScenes.hidden();
    await this._fader.fadeIn();
    await battleScene.start();
  }
}
