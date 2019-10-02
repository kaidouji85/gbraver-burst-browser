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
import type {Scene} from "./scene";
import {emptyScene} from "./scene";
import type {BattleRoom, InitialState} from "../battle-room/battle-room";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;

  _threeJsRender: THREE.WebGLRenderer;
  _domEvent: Observable<DOMEvent>;
  _renderAction: Subject<Render>;
  _renderer: Renderer;

  _scene: Scene;
  _sceneSubscription: Subscription[];

  _gameLoop: Observable<GameLoop>;
  _endBattle: Subject<EndBattle>;
  _gameSubscription: Subscription[];

  constructor(resources: Resources) {
    this._resources = resources;

    this._threeJsRender = createRender();
    if (this._threeJsRender.domElement && document.body) {
      document.body.appendChild(this._threeJsRender.domElement);
    }
    this._domEvent = createDOMEventListener(this._threeJsRender.domElement);
    this._renderAction = new Subject();
    this._renderer = new Renderer({
      renderer: this._threeJsRender,
      listener: {
        domEvent: this._domEvent,
        render: this._renderAction
      }
    });

    this._scene = emptyScene();
    this._sceneSubscription = [];

    this._gameLoop = createGameLoopListener();
    this._endBattle = new Subject();
    this._gameSubscription = [
      this._endBattle.subscribe(action => {
        this._onEndBattle(action);
      })
    ];

    this._onStart();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._scene.destructor();
    this._disposeSceneSubscription();
    this._disposeGameSubscription();
  }

  /** ゲーム開始時のイベント */
  async _onStart(): Promise<void> {
    try {
      const room = createDummyBattleRoom();
      const initialState = await room.start();

      this._disposeSceneSubscription();
      this._scene.destructor();

      const {scene, subscriptions} = this._createBattle(room, initialState);
      this._scene = scene;
      this._sceneSubscription = subscriptions;
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

      this._disposeSceneSubscription();
      this._scene.destructor();

      const {scene, subscriptions} = this._createBattle(room, initialState);
      this._scene = scene;
      this._sceneSubscription = subscriptions;
      // デバッグ用にレンダラ情報をコンソールに出力
      //console.log(this._renderer._renderer.info);
    } catch(e) {
      throw e;
    }
  }

  /**
   * 戦闘シーンとそのサブスクリプションを生成する
   *
   * @param battleRoom 戦闘シーン
   * @param initialState 戦闘シーンサブスクリプション
   * @return 生成結果
   */
  _createBattle(battleRoom: BattleRoom, initialState: InitialState): ({scene: BattleScene, subscriptions: Subscription[]}) {
    const scene = new BattleScene({
      resources: this._resources,
      rendererDOM: this._threeJsRender.domElement,
      battleRoom: battleRoom,
      initialState: initialState,
      listener: {
        domEvent: this._domEvent,
        gameLoop: this._gameLoop,
      }
    });
    const subscriptions = [
      scene.notifier().render.subscribe(this._renderAction),
      scene.notifier().endBattle.subscribe(this._endBattle)
    ];
    return {scene, subscriptions};
  }

  /** シーン固有のサブスクリプションを破棄する */
  _disposeSceneSubscription(): void {
    this._sceneSubscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /** ゲーム固有のサブスクリプションを破棄する */
  _disposeGameSubscription(): void {
    this._gameSubscription.forEach(v => {
      v.unsubscribe();
    });
  }
}