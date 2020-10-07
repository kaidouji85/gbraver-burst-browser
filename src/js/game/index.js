// @flow

import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {ResourceLoader} from "../resource";
import {merge, Observable, Subscription} from "rxjs";
import {isDevelopment} from "../webpack/mode";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import {CssVH} from "../view-port/vh";
import {TDScenes} from "./td-scenes";
import type {Resize} from "../action/resize/resize";
import {createResizeStream} from "../action/resize/resize";
import {InterruptScenes} from "./innterrupt-scenes";
import {DOMDialogs} from "./dom-dialogs";
import type {State} from "./state/state";
import {createInitialState} from "./state/state";
import type {ResourceRoot} from "../resource/root/resource-root";
import {waitAnimationFrame} from "../wait/wait-animation-frame";
import type {NPCBattle} from "./state/npc-battle/npc-battle";
import {createInitialNPCBattle} from "./state/npc-battle/npc-battle";
import {selectionComplete} from "./state/npc-battle/selection-complete";
import {isNPCBattleEnd, levelUp} from "./state/npc-battle/level-up";
import {waitTime} from "../wait/wait-time";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {Player} from "gbraver-burst-core";
import type {NPCBattleCourse} from "./state/npc-battle/npc-battle-course";
import {DefaultCourse, NPCBattleCourses} from "./state/npc-battle/npc-battle-course";
import {OfflineBattleRoom} from "../battle-room/offline-battle-room";
import {invisibleFirstView} from "../first-view/first-view-visible";
import type {EndBattle, SelectionComplete} from "./actions/game-actions";

/**
 * ゲーム全体の管理を行う
 */
export class Game {
  _state: State;
  _resize: Observable<Resize>;
  _vh: CssVH;
  _fader: DOMFader;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resourceRoot: ResourceRoot;
  _resources: ?Resources;
  _serviceWorker: ?ServiceWorkerRegistration;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resourceRoot リソースフォルダのルート
   */
  constructor(resourceRoot: ResourceRoot) {
    this._resourceRoot = resourceRoot;

    this._state = createInitialState();
    this._resize = createResizeStream();
    this._vh = new CssVH(this._resize);

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

    const gameActionNotifier = merge(
      this._tdScenes.gameActionNotifier(),
      this._domScenes.gameActionNotifier(),
      this._domDialogs.gameActionNotifier(),
    );
    this._subscriptions = [
      gameActionNotifier.subscribe(action => {
        if (action.type === 'EndBattle') {
          this._onEndBattle(action);
        } else if (action.type === 'GameStart') {
          this._onGameStart();
        } else if (action.type === 'ShowHowToPlay') {
          this._onShowHowToPlay();
        } else if (action.type === 'SelectionComplete') {
          this._onSelectionComplete(action);
        } else if (action.type === 'EndNPCEnding') {
          this._onEndNPCEnding();
        } else if (action.type === 'EndHowToPlay') {
          this._onEndHowToPlay();
        }
      })
    ];
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理結果
   */
  async initialize(): Promise<void> {
    if (isDevelopment() && document.body) {
      viewPerformanceStats(document.body);
    }
    
    if (!isDevelopment()) {
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
    await this._domScenes.startTitle(resources);
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

    this._state.inProgress = createInitialNPCBattle();
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

    this._domDialogs.startHowToPlay(this._resources);
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
    if (!this._resources) {
      return;
    }
    const resources: Resources = this._resources;

    if (this._state.inProgress.type === 'NPCBattle') {
      const origin: NPCBattle = this._state.inProgress;
      const updated: NPCBattle = selectionComplete(origin, action);
      this._state.inProgress = updated;
      await this._npcBattleFlow(resources, updated);
    }
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

    if (this._state.inProgress.type === 'NPCBattle' && !isNPCBattleEnd(this._state.inProgress, action)) {
      const origin: NPCBattle = this._state.inProgress;
      const updated: NPCBattle = levelUp(origin, action);
      this._state.inProgress = updated;
      await this._npcBattleFlow(resources, updated);
    } else if (this._state.inProgress.type === 'NPCBattle' && isNPCBattleEnd(this._state.inProgress, action)) {
      this._state.inProgress = {type: 'None'};
      await this._fader.fadeOut();
      this._tdScenes.hidden();
      await this._domScenes.startNPCEnding(resources);
      await this._fader.fadeIn();
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
    await this._domScenes.startTitle(resources);
    await this._fader.fadeIn();
  }

  /**
   * NPC戦闘フロー
   *
   * @param resources リソース管理オブジェクト
   * @param npcBattle NPC戦闘ステート
   * @return 処理結果
   */
  async _npcBattleFlow(resources: Resources, npcBattle: NPCBattle): Promise<void> {
    if (!npcBattle.player) {
      return;
    }
    const player: Player = npcBattle.player;

    await this._fader.fadeOut();
    const course: NPCBattleCourse = NPCBattleCourses.find(v =>
      v.armdozerId === player.armdozer.id
      && v.level === npcBattle.level
    ) ?? DefaultCourse;
    const npc = course.npc();
    await this._domScenes.startMatchCard(
      resources,
      player.armdozer.id,
      npc.armdozer.id,
      course.stageName,
    );
    await this._fader.fadeIn();

    const room = new OfflineBattleRoom(player, npc);
    const initialState = await room.start();
    const battleScene = this._tdScenes.startBattle(resources, room, initialState);
    await waitAnimationFrame();

    await this._fader.fadeOut();
    this._domScenes.hidden();
    await this._fader.fadeIn();
    await battleScene.start();
  }
}
