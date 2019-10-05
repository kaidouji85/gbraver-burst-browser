// @flow

import {BattleScene} from "./scene/battle";
import type {Resources} from "../resource";
import * as THREE from "three";
import {createGameLoopListener} from "../action/game-loop/create-listener";
import {Renderer} from "../game-object/renderer";
import {Observable, Subject, Subscription} from "rxjs";
import type {EndBattle} from "../action/game/end-battle";
import type {GameLoop} from "../action/game-loop/game-loop";
import {createRender} from "../render/create-render";
import type {Render} from "../action/game-loop/render";
import type {BattleRoom, InitialState} from "../battle-room/battle-room";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";
import {BoundScene, emptyBoundScene} from "./bound-scene";
import type {GameAction} from "../action/game/game-action";
import {isDevelopment} from "../webpack/mode";

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;
  _renderAction: Subject<Render>;
  _gameAction: Subject<GameAction>;
  _gameLoop: Observable<GameLoop>;
  _threeJsRender: THREE.WebGLRenderer;
  _renderer: Renderer;
  _boundScene: BoundScene;
  _subscription: Subscription;

  constructor(resources: Resources) {
    this._resources = resources;

    this._renderAction = new Subject();
    this._gameLoop = createGameLoopListener();
    this._gameAction = new Subject();

    this._threeJsRender = createRender();
    if (this._threeJsRender.domElement && document.body) {
      document.body.appendChild(this._threeJsRender.domElement);
    }
    this._renderer = new Renderer({
      threeJsRender: this._threeJsRender,
      listener: {
        render: this._renderAction
      }
    });
    this._boundScene = emptyBoundScene();

    this._subscription = this._gameAction.subscribe(action => {
      if (action.type === 'endBattle') {
        this._onEndBattle(action);
      }
    });

    this._onStart();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._boundScene.destructor();
    this._subscription.unsubscribe();
  }

  /** ゲーム開始時のイベント */
  async _onStart(): Promise<void> {
    try {
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._changeBattleScene(room, initialState);
      // デバッグ用にレンダラ情報をコンソールに出力
      if (isDevelopment()) {
        console.log(this._renderer.info());
      }
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
      if (isDevelopment()) {
        console.log(this._renderer.info());
      }
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
    this._boundScene.destructor();

   const scene = new BattleScene({
      resources: this._resources,
      rendererDOM: this._threeJsRender.domElement,
      battleRoom: battleRoom,
      initialState: initialState,
      listener: {
        domEvent: this._renderer.notifier().domEvent,
        gameLoop: this._gameLoop,
      }
    });
    const subscription = [
      scene.notifier().render.subscribe(this._renderAction),
      scene.notifier().endBattle.subscribe(this._gameAction)
    ];
    this._boundScene = new BoundScene(scene, subscription);
  }
}