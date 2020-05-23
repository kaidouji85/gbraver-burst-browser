// @flow

import * as THREE from 'three';
import {DOMScenes} from "./dom-scenes";
import type {Resources} from "../resource";
import {loadAllResource} from "../resource";
import {Observable, Subscription} from "rxjs";
import {isDevelopment} from "../webpack/mode";
import {viewPerformanceStats} from "../stats/view-performance-stats";
import {loadServiceWorker} from "../service-worker/load-service-worker";
import type {EndBattle} from "../action/game/battle";
import {CssVH} from "../view-port/vh";
import {TDScenes} from "./td-scenes";
import type {LoadingAction} from "../action/loading/loading";
import {createLoadingActionListener} from "../action/loading/create-listener";
import type {Resize} from "../action/resize/resize";
import {createResizeStream} from "../action/resize/resize";
import {InterruptScenes} from "./innterrupt-scenes";
import type {EndHowToPlay} from "../action/game/how-to-play";
import {DOMDialogs} from "./dom-dialogs";
import type {PushGameStart, PushHowToPlay} from "../action/game/title";
import type {State} from "./state/state";
import {createInitialState} from "./state/state";
import type {ResourcePath} from "../resource/path/resource-path";
import type {SelectionComplete} from "../action/game/selection-complete";
import {waitAnimationFrame} from "../wait/wait-animation-frame";
import {PreLoadLinks} from "./preload-links";
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
import type {EndNPCEnding} from "../action/game/npc-ending";

/**
 * ゲーム全体の管理を行う
 */
export class Game {
  _state: State;
  _loading: Observable<LoadingAction>;
  _resize: Observable<Resize>;
  _vh: CssVH;
  _preLoadLinks: PreLoadLinks;
  _fader: DOMFader;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resourcePath: ResourcePath;
  _resources: ?Resources;
  _serviceWorker: ?ServiceWorkerRegistration;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._resourcePath = resourcePath;

    this._state = createInitialState();
    this._loading = createLoadingActionListener(THREE.DefaultLoadingManager);
    this._resize = createResizeStream();
    this._vh = new CssVH(this._resize);

    this._preLoadLinks = new PreLoadLinks(resourcePath);
    const head = document.head ?? document.createElement('head');
    this._preLoadLinks.getLinks().forEach(link => {
      head.appendChild(link);
    });

    this._fader = new DOMFader();

    this._interruptScenes = new InterruptScenes({
      resourcePath: this._resourcePath,
    });
    this._domScenes = new DOMScenes({
      resourcePath: this._resourcePath,
      loading: this._loading,
    });
    this._domDialogs = new DOMDialogs();
    this._tdScenes = new TDScenes(this._resize);

    const body = document.body || document.createElement('div');
    const elements = [
      this._fader.getRootHTMLElement(),
      ...this._interruptScenes.getRootHTMLElements(),
      ...this._domDialogs.getRootHTMLElements(),
      this._domScenes.getRootHTMLElement(),
      this._tdScenes.getRendererDOM(),
    ];
    elements.forEach(element => {
      body.appendChild(element);
    });

    this._resources = null;
    this._serviceWorker = null;

    const domScenesNotifier = this._domScenes.notifier();
    const domDialogNotifier = this._domDialogs.notifier();
    const tdNotifier = this._tdScenes.notifier();
    this._subscriptions = [
      domScenesNotifier.pushGameStart.subscribe(action => {
        this._onPushGameStart(action);
      }),
      domScenesNotifier.pushHowToPlay.subscribe(action => {
        this._onPushHowToPlay(action);
      }),
      domDialogNotifier.endHowToPlay.subscribe(action => {
        this._onEndHowToPlay(action);
      }),
      tdNotifier.endBattle.subscribe(action => {
        this._onEndBattle(action);
      }),
      domScenesNotifier.selectionComplete.subscribe(action => {
        this._onSelectionComplete(action);
      }),
      domScenesNotifier.endNPCEnding.subscribe(action => {
        this._onEndNPCEnding(action);
      })
    ];
  }

  /**
   * ゲームの初期化を行う
   *
   * @return 処理結果
   */
  async initialize(): Promise<void> {
    try {
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }
      this._serviceWorker = await loadServiceWorker();

      await this._fader.fadeOut();
      await this._domScenes.startTitle();
      await this._fader.fadeIn();
    } catch (e) {
      throw e;
    }
  }

  /**
   * ゲームスタートボタンを押した際の処理
   *
   * @param action アクション
   */
  async _onPushGameStart(action: PushGameStart) {
    try {
      this._state.inProgress = createInitialNPCBattle();

      await this._fader.fadeOut();
      await this._domScenes.startPlayerSelect();
      await this._fader.fadeIn();
    } catch(e) {
      throw e;
    }
  }

  /**
   * 遊び方ボタンを押した際の処理
   *
   * @param action アクション
   */
  _onPushHowToPlay(action: PushHowToPlay) {
    this._domDialogs.showHowToPlay();
  }

  /**
   * 遊び方シーン終了
   *
   * @param action アクション
   */
  _onEndHowToPlay(action: EndHowToPlay) {
    this._domDialogs.hidden();
  }

  /**
   * プレイヤーキャラクター 選択完了時の処理
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    try {
      if (!this._resources) {
        await this._loadResourcesFlow();
      }

      if (this._state.inProgress.type === 'NPCBattle') {
        const origin: NPCBattle = this._state.inProgress;
        this._state.inProgress = selectionComplete(origin, action);
        await this._npcBattleFlow();
      }
    } catch(e) {
      throw e;
    }
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    try {
      if (this._state.inProgress.type === 'NPCBattle' && !isNPCBattleEnd(this._state.inProgress, action)) {
        const origin: NPCBattle = this._state.inProgress;
        this._state.inProgress = levelUp(origin, action);
        await this._npcBattleFlow();
      } else if (this._state.inProgress.type === 'NPCBattle' && isNPCBattleEnd(this._state.inProgress, action)) {
        this._state.inProgress = {type: 'None'};

        await this._fader.fadeOut();
        this._tdScenes.hidden();
        await this._domScenes.startNPCEnding();
        await this._fader.fadeIn();
      }
    } catch(e) {
      throw e;
    }
  }

  /**
   * NPC戦闘エンディングが終了した際の処理
   *
   * @param action アクション
   */
  async _onEndNPCEnding(action: EndNPCEnding): Promise<void> {
    try {
      await this._fader.fadeOut();
      await this._domScenes.startTitle();
      await this._fader.fadeIn();
    } catch(e) {
      throw e;
    }
  }

  /**
   * リソース読み込みフロー
   *
   * @return 処理結果
   */
  async _loadResourcesFlow(): Promise<void> {
    try {
      await this._fader.fadeOut();
      this._domScenes.startLoading();
      await this._fader.fadeIn();

      this._resources = await loadAllResource(`${this._resourcePath.get()}/`);
      await waitAnimationFrame();
      await waitTime(1000);
    } catch(e) {
      throw e;
    }
  }

  /**
   * NPC戦闘フロー
   *
   * @return 処理結果
   */
  async _npcBattleFlow(): Promise<void> {
    try {
      if (!this._resources || (this._state.inProgress.type !== 'NPCBattle')) {
        return;
      }
      const resources: Resources = this._resources;
      const npcBattle: NPCBattle = this._state.inProgress;

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
    } catch(e) {
      throw e;
    }
  }
}
