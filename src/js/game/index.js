// @flow

import {BattleScene} from "./battle";
import type {Resources} from "../resource";
import * as THREE from "three";
import {createGameLoopListener} from "../action/game-loop/create-listener";
import {createDOMEventListener} from "../action/dom-event/create-listener";
import {Renderer} from "../game-object/renderer";
import {Observable, Subject, Subscription} from "rxjs";
import type {EndBattle} from "../action/game/end-battle";
import type {GameLoop} from "../action/game-loop/game-loop";
import type {DOMEvent} from "../action/dom-event";
import {createRender} from "../render/create-render";
import type {Render} from "../action/game-loop/render";
import type {BattleRoom, InitialState} from "../battle-room/battle-room";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";
import type {BoundScene} from "./bound-scene";
import {disposeBoundScene, emptyBoundScene} from "./bound-scene";

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;

  _threeJsRender: THREE.WebGLRenderer;
  _domEventListener: Observable<DOMEvent>;
  _renderSubject: Subject<Render>;
  _renderer: Renderer;

  _gameLoopListener: Observable<GameLoop>;
  _endBattleSubject: Subject<EndBattle>;
  _subscription: Subscription[];

  _boundScene: BoundScene;

  constructor(resources: Resources) {
    this._resources = resources;

    this._threeJsRender = createRender();
    if (this._threeJsRender.domElement && document.body) {
      document.body.appendChild(this._threeJsRender.domElement);
    }
    this._domEventListener = createDOMEventListener(this._threeJsRender.domElement);
    this._renderSubject = new Subject();
    this._renderer = new Renderer({
      renderer: this._threeJsRender,
      listener: {
        domEvent: this._domEventListener,
        render: this._renderSubject
      }
    });

    this._gameLoopListener = createGameLoopListener();
    this._endBattleSubject = new Subject();
    this._subscription = [
      this._endBattleSubject.subscribe(action => {
        this._onEndBattle(action);
      })
    ];
    this._boundScene = emptyBoundScene();

    this._onStart();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._boundScene.scene.destructor();
    this._boundScene.subscription.forEach(v => {
      v.unsubscribe();
    });
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /** ゲーム開始時のイベント */
  async _onStart(): Promise<void> {
    try {
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._changeBattleScene(room, initialState);
      // デバッグ用にレンダラ情報をコンソールに出力
      //console.log(this._renderer._renderer.info);
    } catch(e) {
      throw e;
    }
  }

  /**
   * 戦闘シーン終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    try {
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._changeBattleScene(room, initialState);
      // デバッグ用にレンダラ情報をコンソールに出力
      //console.log(this._renderer._renderer.info);
    } catch(e) {
      throw e;
    }
  }

  /**
   * 戦闘シーンに切り替える
   *
   * @param battleRoom 戦闘シーン
   * @param initialState 初期状態
   */
  _changeBattleScene(battleRoom: BattleRoom, initialState: InitialState): void {
    const scene = new BattleScene({
      resources: this._resources,
      rendererDOM: this._threeJsRender.domElement,
      battleRoom: battleRoom,
      initialState: initialState,
      listener: {
        domEvent: this._domEventListener,
        gameLoop: this._gameLoopListener,
      }
    });
    const subscription = [
      scene.notifier().render.subscribe(this._renderSubject),
      scene.notifier().endBattle.subscribe(this._endBattleSubject)
    ];
    const newBoundedScene = {
      scene: scene,
      subscription: subscription
    };

    disposeBoundScene(this._boundScene);
    this._boundScene = newBoundedScene;
  }
}