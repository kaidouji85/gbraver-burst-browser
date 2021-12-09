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
import type {InNPCBattleCourse, NPCBattle, NPCBattleX} from "./in-progress/npc-battle/npc-battle";
import {isStageClear, startNPCBattleCourse} from "./in-progress/npc-battle/npc-battle";
import {waitTime} from "../wait/wait-time";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {Player} from "gbraver-burst-core";
import {NPCBattleRoom} from "../npc/npc-battle-room";
import {invisibleFirstView} from "../first-view/first-view-visible";
import type {EndBattle, EndNetworkError, GameAction, SelectionComplete} from "./actions/game-actions";
import type {InProgress} from "./in-progress/in-progress";
import type {Stream, Unsubscriber} from "../stream/core";
import type {
  CasualMatch as CasualMatchSDK,
  LoggedInUserDelete,
  LoginCheck,
  Logout,
  MailVerify,
  UniversalLogin,
  UserMailGet,
  UserNameGet,
  UserPictureGet
} from '@gbraver-burst-network/browser-core';
import type {CasualMatch} from "./in-progress/casual-match/casual-match";
import {Title} from "./dom-scenes/title/title";
import {SuddenlyBattleEndMonitor} from "./network/suddenly-battle-end-monitor";
import {map} from "../stream/operator";
import type {NPCBattleStage, StageLevel} from "./npc-battle/npc-battle-stage";
import type {WebsocketDisconnect} from "@gbraver-burst-network/browser-core/lib";

/** 本クラスで利用するAPIサーバの機能 */
interface OwnAPI extends UniversalLogin, LoginCheck, CasualMatchSDK, Logout, LoggedInUserDelete,
  UserNameGet, UserPictureGet, MailVerify, UserMailGet, WebsocketDisconnect {}

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
  _suddenlyBattleEndMonitor: SuddenlyBattleEndMonitor;
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
    this._termsOfServiceURL = param.termsOfServiceURL;
    this._privacyPolicyURL = param.privacyPolicyURL;
    this._contactURL = param.contactURL;
    this._isAPIServerEnable = param.isAPIServerEnable;

    this._inProgress = {type: 'None'};
    this._resize = resizeStream();
    this._vh = new CssVH(this._resize);

    this._api = param.api;
    this._suddenlyBattleEndMonitor = new SuddenlyBattleEndMonitor();

    this._fader = new DOMFader();
    this._interruptScenes = new InterruptScenes();
    this._domScenes = new DOMScenes();
    this._domDialogs = new DOMDialogs();
    this._tdScenes = new TDScenes(this._resize);

    const body = document.body || document.createElement('div');
    const elements = [this._fader.getRootHTMLElement(), this._interruptScenes.getRootHTMLElement(),
      this._domDialogs.getRootHTMLElement(), this._domScenes.getRootHTMLElement(), 
      this._tdScenes.getRendererDOM()];
    elements.forEach(element => {
      body.appendChild(element);
    });

    this._resources = null;
    this._serviceWorker = null;

    const gameActionStreams = [this._tdScenes.gameActionNotifier(), this._domScenes.gameActionNotifier(),
      this._domDialogs.gameActionNotifier(),
      this._suddenlyBattleEndMonitor.notifier().chain(map(v => (v: GameAction)))];
    this._unsubscriber = gameActionStreams.map(v => v.subscribe(action => {
      if (action.type === 'EndBattle') { this._onEndBattle(action) }
      else if (action.type === 'SuddenlyBattleEnd') { this._onSuddenlyEndBattle() }
      else if (action.type === 'GameStart') { this._onGameStart() }
      else if (action.type === 'CasualMatchStart') { this._onCasualMatchStart() }
      else if (action.type === 'ShowHowToPlay') { this._onShowHowToPlay() }
      else if (action.type === 'SelectionComplete') { this._onSelectionComplete(action) }
      else if (action.type === 'SelectionCancel') { this._onSelectionCancel() }
      else if (action.type === 'EndNPCEnding') { this._onEndNPCEnding() }
      else if (action.type === 'EndHowToPlay') { this._onEndHowToPlay() }
      else if (action.type === 'UniversalLogin') { this._onUniversalLogin() }
      else if (action.type === 'Logout') { this._onLogout() }
      else if (action.type === 'AccountDeleteConsent') { this._onAccountDeleteConsent() }
      else if (action.type === 'DeleteAccount') { this._onDeleteAccount() }
      else if (action.type === 'CancelAccountDeletion') { this._onCancelAccountDeletion() }
      else if (action.type === 'LoginCancel') { this._onLoginCancel() }
      else if (action.type === 'EndNetworkError') { this._onEndNetworkError(action) }
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

    invisibleFirstView();
    const [isLogin, isMailVerified] = await Promise.all([this._api.isLogin(), this._api.isMailVerified()]);
    if (isLogin && !isMailVerified) {
      const mailAddress = await this._api.getMail();
      this._domScenes.startMailVerifiedIncomplete(mailAddress);
      await this._fader.fadeIn();
      return;
    }

    const loader = new ResourceLoader(this._resourceRoot);
    this._domScenes.startLoading(loader.progress());
    await this._fader.fadeIn();
    const resources: Resources = await loader.load();
    this._resources = resources;
    await waitAnimationFrame();
    await waitTime(1000);
    await this._fader.fadeOut();
    await this._startTitle(resources);
    this._interruptScenes.bind(resources);
    await this._fader.fadeIn();
  }

  /**
   * ゲームスタート時の処理
   */
  async _onGameStart(): Promise<void> {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const subFlow = {type: 'PlayerSelect'};
    this._inProgress = {type: 'NPCBattle', subFlow};
    await this._fader.fadeOut();
    await this._domScenes.startPlayerSelect(resources);
    await this._fader.fadeIn();
  }

  /**
   * カジュアルマッチ開始
   */
  async _onCasualMatchStart(): Promise<void> {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const loginCheck = async (): Promise<boolean> => {
      this._domDialogs.startWaiting('ログインチェック中......');
      const isLogin = await (async () => {
        try {
          return await this._api.isLogin();
        } catch (e) {
          const postNetworkError = {type: 'Close'};
          this._domDialogs.startNetworkError(resources, postNetworkError);
          throw e;     
        }
      })();
      this._domDialogs.hidden();
      return isLogin;
    };
    const gotoPlayerSelect = async (): Promise<void> => {
      const subFlow = {type: 'PlayerSelect'};
      this._inProgress = {type: 'CasualMatch', subFlow};
      this._domDialogs.hidden();
      await this._fader.fadeOut();
      await this._domScenes.startPlayerSelect(resources);
      await this._fader.fadeIn();
    };
    const showLoginDialog = () => {
      this._domDialogs.startLogin(resources, 'ネット対戦をするにはログインをしてください');
    };

    const isLogin = await loginCheck();
    if (isLogin) {
      await gotoPlayerSelect();
    } else {
      showLoginDialog();
    }
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
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    this._domDialogs.startDeleteAccountConsent(resources);
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
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    this._domDialogs.startHowToPlay(resources, this._howToPlayMovieURL);
  }

  /**
   * 遊び方ダイアログを閉じる
   */
  _onEndHowToPlay() {
    this._domDialogs.hidden();
  }

  /**
   * 通信エラーダイアログを閉じる
   *
   * @param action アクション
   */
  async _onEndNetworkError(action: EndNetworkError) {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const close = async () => {
      this._inProgress = {type: 'None'};
      this._domDialogs.hidden();
    };
    const gotoTitle = async () => {
      this._inProgress = {type: 'None'};
      this._domDialogs.hidden();
      await this._fader.fadeOut();
      await this._startTitle(resources);
      await this._fader.fadeIn();
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
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const npcBattlePlayerSelect = async (origin: NPCBattle): Promise<void> => {
      const inNPCBattleCourse = startNPCBattleCourse(action);
      const {player, level} = inNPCBattleCourse;
      const stage = inNPCBattleCourse.course.stage(level);
      this._inProgress = {...origin, subFlow: inNPCBattleCourse};
      await this._startNPCBattleStage(resources, player, stage, level);
    };
    const waitMatching = async (origin: CasualMatch): Promise<void> => {
      this._domDialogs.startWaiting('マッチング中......');
      const battle = await (async () => {
        try {
          await this._api.disconnectWebsocket();
          return await this._api.startCasualMatch(action.armdozerId, action.pilotId);
        } catch(e) {
          const postNetworkError = {type: 'GotoTitle'};
          this._domDialogs.startNetworkError(resources, postNetworkError);
          throw e;
        }
      })();
      this._suddenlyBattleEndMonitor.bind(battle);
      const subFlow = {type: 'Battle', battle};
      this._inProgress = {...origin, subFlow};

      await this._fader.fadeOut();
      this._domDialogs.hidden();
      await this._domScenes.startMatchCard(resources, battle.player.armdozer.id, battle.enemy.armdozer.id, 'CASUAL MATCH');
      await this._fader.fadeIn();

      const progress = async (v) =>  {
        try {
          this._domDialogs.startWaiting('通信中......');
          const update = await battle.progress(v);
          this._domDialogs.hidden();
          return update;
        } catch(e) {
          const postNetworkError = {type: 'GotoTitle'};
          this._domDialogs.startNetworkError(resources, postNetworkError);
          throw e;
        }
      };
      const battleScene = this._tdScenes.startBattle(resources, {progress}, battle.player,
        battle.enemy, battle.initialState);
      await waitAnimationFrame();
      await this._fader.fadeOut();
      this._domScenes.hidden();
      await this._fader.fadeIn();
      await battleScene.start();
    };

    if (this._inProgress.type === 'NPCBattle') {
      await npcBattlePlayerSelect(this._inProgress);
    } else if (this._inProgress.type === 'CasualMatch') {
      await waitMatching(this._inProgress);
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
    await this._startTitle(resources);
    await this._fader.fadeIn();
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const npcBattleStageClear = async (origin: NPCBattleX<InNPCBattleCourse>): Promise<void> => {
      const {level, course} = origin.subFlow;
      const nextLevel = level + 1;
      const nextStage = course.stage(nextLevel);
      const updatedInNPCBattle = {...origin.subFlow, level: nextLevel};
      this._inProgress = {...origin, subFlow: updatedInNPCBattle};
      await this._startNPCBattleStage(resources, origin.subFlow.player, nextStage, nextLevel);
    };
    const npcBattleStageFailed = async (origin: NPCBattleX<InNPCBattleCourse>): Promise<void> => {
      const {level, player} = origin.subFlow;
      const stage = origin.subFlow.course.stage(level);
      await this._startNPCBattleStage(resources, player, stage, level);
    }; 
    const npcBattleComplete = async (): Promise<void> => {
      this._inProgress = {type: 'None'};
      await this._fader.fadeOut();
      this._tdScenes.hidden();
      this._suddenlyBattleEndMonitor.unbind();
      await this._domScenes.startNPCEnding(resources);
      await this._fader.fadeIn();
    };
    const endCasualMatch = async (): Promise<void> => {
      this._inProgress = {type: 'None'};
      await this._fader.fadeOut();
      await this._api.disconnectWebsocket();
      this._tdScenes.hidden();
      await this._startTitle(resources);
      await this._fader.fadeIn();
    };

    if (this._inProgress.type === 'NPCBattle' && this._inProgress.subFlow.type === 'InNPCBattleCourse') {
      const inNPCBattleCourse: InNPCBattleCourse = this._inProgress.subFlow;
      const {player, level, course} = inNPCBattleCourse;
      const isNPCBattleStageClear = isStageClear(player, action.gameEnd.result);
      const isLastStage = course.lastStageLevel() <= level;
      const castedInProgress = ((this._inProgress: any): NPCBattleX<typeof inNPCBattleCourse>);
      if (isNPCBattleStageClear && !isLastStage) {
        await npcBattleStageClear(castedInProgress);
      } else if (isNPCBattleStageClear && isLastStage) {
        await npcBattleComplete();
      } else {
        await npcBattleStageFailed(castedInProgress);
      }
    } else if (this._inProgress.type === 'CasualMatch') {
      await endCasualMatch();
    }
  }

  /**
   * バトル強制終了時の処理
   */
  async _onSuddenlyEndBattle(): Promise<void> {
    if (!this._resources) {
      return;
    }

    const resources: Resources = this._resources;
    const postNetworkError = {type: 'GotoTitle'};
    this._domDialogs.startNetworkError(resources, postNetworkError);
    this._suddenlyBattleEndMonitor.unbind();
    await this._api.disconnectWebsocket();
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
    await this._startTitle(resources);
    await this._fader.fadeIn();
  }

  /**
   * NPCバトルのステージを開始するヘルパーメソッド
   *
   * @param resources リソース管理オブジェクト
   * @param player プレイヤー
   * @param stage NPCバトルステージ
   * @param level ステージレベル
   */
  async _startNPCBattleStage(resources: Resources, player: Player, stage: NPCBattleStage, level: StageLevel) {
    const npcBattle = new NPCBattleRoom(player, stage.npc);
    await this._fader.fadeOut();
    await this._domScenes.startNPCStageTitle(resources, level, stage.caption, npcBattle.enemy.armdozer.id);
    await this._fader.fadeIn();
    const startNPCStageTitleTime = Date.now();
    const progress = v => Promise.resolve(npcBattle.progress(v));
    const battleScene = this._tdScenes.startBattle(resources, {progress}, npcBattle.player,
      npcBattle.enemy, npcBattle.stateHistory());
    await waitAnimationFrame();
    const battleSceneReadyTime = Date.now();
    const latency = battleSceneReadyTime - startNPCStageTitleTime;
    await waitTime(Math.max(3000- latency, 0));
    await this._fader.fadeOut();
    this._domScenes.hidden();
    await this._fader.fadeIn();
    await battleScene.start();
  }

  /**
   * タイトル画面を開始するヘルパーメソッド
   * いかなる場合でもaccount、canCasualMatch、termsOfServiceURL、privacyPolicyURL
   * に同じ値をセットするために、ヘルパーメソッド化した
   *    
   * @param resources リソース管理オブジェクト
   * @return タイトル画面
   */
  async _startTitle(resources: Resources): Promise<Title> {
    const guestAccount = {type: 'GuestAccount'};
    const createLoggedInAccount = async () => {
      const [name, pictureURL] = await Promise.all([
        this._api.getUserName(),
        this._api.getUserPictureURL(),
      ]);
      return {type: 'LoggedInAccount', name, pictureURL};
    }
    const isLogin = await this._api.isLogin();
    const account = isLogin ? await createLoggedInAccount() : guestAccount;
    return this._domScenes.startTitle(resources, account, this._isAPIServerEnable,
      this._termsOfServiceURL, this._privacyPolicyURL, this._contactURL);
  }
}
