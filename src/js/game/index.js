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

/** アクティブシーン */
type ActiveScene = {
  /** アクティブシーン */
  scene: Scene,

  /**
   * アクティブシーンイベント通知 -> ゲームサブジェクト をチェインした結果生成されたサブスクリプション
   * アクティブシーン変更時にサブスクリプションを破棄する必要があるため、
   * 本プロパティにキャッシュをする
   */
  subscription: Subscription[]
};

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;

  _threeJsRender: THREE.WebGLRenderer;
  _domEventListener: Observable<DOMEvent>;
  _renderSubject: Subject<Render>;
  _renderer: Renderer;

  _gameLoopListener: Observable<GameLoop>;
  _endBattleSubject: Subject<EndBattle>;
  _gameSubscription: Subscription[];

  _activeScene: ActiveScene;

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
    this._gameSubscription = [
      this._endBattleSubject.subscribe(action => {
        this._onEndBattle(action);
      })
    ];

    this._activeScene = {
      scene: emptyScene(),
      subscription: []
    };

    this._onStart();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._activeScene.scene.destructor();
    this._activeScene.subscription.forEach(v => {
      v.unsubscribe();
    });
    this._gameSubscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /** ゲーム開始時のイベント */
  async _onStart(): Promise<void> {
    try {
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      const activeScene = this._activeBattleScene(room, initialState);
      this._changeActiveScene(activeScene);
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
      const activeScene = this._activeBattleScene(room, initialState);
      this._changeActiveScene(activeScene);
      // デバッグ用にレンダラ情報をコンソールに出力
      //console.log(this._renderer._renderer.info);
    } catch(e) {
      throw e;
    }
  }

  /**
   * 戦闘アクティブシーンを生成する
   *
   * @param battleRoom 戦闘シーン
   * @param initialState 初期状態
   * @return 生成結果
   */
  _activeBattleScene(battleRoom: BattleRoom, initialState: InitialState): ActiveScene {
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

    return {
      scene: scene,
      subscription: subscription
    };
  }

  _changeActiveScene(activeScene: ActiveScene): void {
    this._activeScene.scene.destructor();
    this._activeScene.subscription.forEach(v => {
      v.unsubscribe();
    });

    this._activeScene = activeScene;
  }
}