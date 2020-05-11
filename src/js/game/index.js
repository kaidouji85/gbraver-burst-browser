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
import {createInitialState} from "./state/initial-state";
import type {ResourcePath} from "../resource/path/resource-path";
import type {SelectionComplete} from "../action/game/selection-complete";
import {waitAnimationFrame} from "../wait/wait-animation-frame";
import {PreLoadLinks} from "./preload-links";
import {waitTime} from "../wait/wait-time";
import {OfflineBattleRoom} from "../battle-room/offline-battle-room";
import type {NPCCourse} from "./state/npc-battle/npc-course";
import {DefaultCourse, NPCCourses} from "./state/npc-battle/npc-course";
import {createNPCBattleCourse} from "./state/npc-battle/npc-battle";
import type {NPCBattle} from "./state/npc-battle/npc-battle";
import {selectionComplete} from "./state/npc-battle/selection-complete";
import {endBattle} from "./state/npc-battle/end-battle";
import type {Player} from "gbraver-burst-core";

/** ゲーム全体の管理を行う */
export class Game {
  _state: State;
  _loading: Observable<LoadingAction>;
  _resize: Observable<Resize>;
  _vh: CssVH;
  _preLoadLinks: PreLoadLinks;
  _interruptScenes: InterruptScenes;
  _domScenes: DOMScenes;
  _domDialogs: DOMDialogs;
  _tdScenes: TDScenes;
  _resourcePath: ResourcePath;
  _resources: ?Resources;
  _serviceWorker: ?ServiceWorkerRegistration;
  _subscriptions: Subscription[];

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
      })
    ];
  }

  /** ゲームの初期化を行う */
  async initialize(): Promise<void> {
    try {
      this._domScenes.showTitle();
      if (isDevelopment()) {
        viewPerformanceStats(document.body);
      }
      this._serviceWorker = await loadServiceWorker();
    } catch (e) {
      throw e;
    }
  }

  /**
   * ゲームスタートボタンを押した
   */
  _onPushGameStart(action: PushGameStart) {
    this._state = {
      ...this._state,
      inProgress: createNPCBattleCourse()
    };
    this._domScenes.showPlayerSelect();
  }

  /**
   * 遊び方ボタンを押した
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
   * プレイヤー選択完了
   *
   * @param action アクション
   */
  async _onSelectionComplete(action: SelectionComplete): Promise<void> {
    try {
      if (this._state.inProgress.type !== 'NPCBattle') {
        return;
      }
      const npcBattle: NPCBattle = this._state.inProgress;
      this._state = {
        ...this._state,
        inProgress: selectionComplete(npcBattle, action)
      };

      this._domScenes.showLoading();
      const resources = await loadAllResource(`${this._resourcePath.get()}/`);
      this._resources = resources;
      await waitAnimationFrame();
      await this._startNPCBattle();
    } catch (e) {
      throw e;
    }
  }

  /**
   * 戦闘終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle) {
    try {
      if (this._state.inProgress.type !== 'NPCBattle') {
        return;
      }
      const npcBattle: NPCBattle = this._state.inProgress;
      this._state = {
        ...this._state,
        inProgress: endBattle(npcBattle, action)
      };

      await this._startNPCBattle();
    } catch (e) {
      throw e;
    }
  }

  /**
   * NPC線をスタートさせる
   *
   * @return 実行結果
   */
  async _startNPCBattle(): Promise<void> {
    try {
      if (!this._resources) {
        return;
      }
      const resources: Resources = this._resources;

      if (this._state.inProgress.type !== 'NPCBattle') {
        return;
      }
      const npcBattle: NPCBattle = this._state.inProgress;

      if (!npcBattle.player) {
        return;
      }
      const player: Player = npcBattle.player;

      const course: NPCCourse = NPCCourses.find(v =>
        v.armdozerId === player.armdozer.id
        && v.level === npcBattle.level
      ) ?? DefaultCourse;
      const npc = course.npc();
      this._domScenes.showMatchCard(
        player.armdozer.id,
        npc.armdozer.id,
        course.stageName,
      );
      const room = new OfflineBattleRoom(player, npc);
      const initialState = await room.start();
      await waitTime(1000);

      this._tdScenes.startBattle(resources, room, initialState);
      this._domScenes.hidden();
    } catch (e) {
      throw e;
    }
  }
}
