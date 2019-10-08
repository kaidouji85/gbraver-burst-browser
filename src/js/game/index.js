// @flow

import {BattleScene} from "./battle";
import type {Resources} from "../resource";
import {createGameLoopListener} from "../action/game-loop/create-listener";
import {Renderer} from "../game-object/renderer";
import {Observable, Subject, Subscription} from "rxjs";
import type {EndBattle} from "../action/game/end-battle";
import type {GameLoop} from "../action/game-loop/game-loop";
import {createRender} from "../render/create-render";
import type {Render} from "../action/game-loop/render";
import type {BattleRoom, InitialState} from "../battle-room/battle-room";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";
import type {GameAction} from "../action/game/game-action";
import {isDevelopment} from "../webpack/mode";
import {SceneCache} from "./scene";
import {TitleScene} from "./title";

/** ゲーム全体で利用するイベントストリーム */
export class GameStream {
  render: Subject<Render>;
  gameAction: Subject<GameAction>;
  gameLoop: Observable<GameLoop>;

  constructor() {
    this.render = new Subject();
    this.gameAction = new Subject();
    this.gameLoop = createGameLoopListener();
  }
}

export function bindTitleScene(resources: Resources, renderer: Renderer, stream: GameStream): SceneCache {
  const scene = new TitleScene({
    resources: resources,
    rendererDOM: renderer.getRendererDOM(),
    listener: {
      domEvent: renderer.notifier().domEvent,
      gameLoop: stream.gameLoop,
    }
  });
  const subscription = [
    scene.notifier().render.subscribe(stream.render)
  ];
  return new SceneCache(scene, subscription);
}

export function bindBattleScene(resources: Resources, renderer: Renderer, stream: GameStream, battleRoom: BattleRoom, initialState: InitialState): SceneCache {
  const scene = new BattleScene({
    resources: resources,
    rendererDOM: renderer.getRendererDOM(),
    battleRoom: battleRoom,
    initialState: initialState,
    listener: {
      domEvent: renderer.notifier().domEvent,
      gameLoop: stream.gameLoop,
    }
  });
  const subscription = [
    scene.notifier().render.subscribe(stream.render),
    scene.notifier().endBattle.subscribe(stream.gameAction)
  ];
  return new SceneCache(scene, subscription);
}

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;
  _stream: GameStream;
  _renderer: Renderer;
  _sceneCache: ?SceneCache;
  _subscription: Subscription;

  constructor(resources: Resources) {
    this._resources = resources;
    this._stream = new GameStream();

    const threeJsRender = createRender();
    if (threeJsRender.domElement && document.body) {
      document.body.appendChild(threeJsRender.domElement);
    }
    this._renderer = new Renderer({
      threeJsRender: threeJsRender,
      listener: {
        render: this._stream.render
      }
    });
    this._sceneCache = null;

    this._subscription = this._stream.gameAction.subscribe(action => {
      if (action.type === 'endBattle') {
        this._onEndBattle(action);
      }
    });

    this._onStart();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._sceneCache && this._sceneCache.destructor();
    this._subscription.unsubscribe();
  }

  /** ゲーム開始時のイベント */
  async _onStart(): Promise<void> {
    try {
      const room = createDummyBattleRoom();
      const initialState = await room.start();
      this._sceneCache && this._sceneCache.destructor();
      this._sceneCache = bindBattleScene(this._resources, this._renderer, this._stream, room, initialState);
      // // デバッグ用にレンダラ情報をコンソールに出力
      if (isDevelopment()) {
        console.log(this._renderer.info());
      }
    } catch (e) {
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
      this._sceneCache && this._sceneCache.destructor();
      this._sceneCache = bindBattleScene(this._resources, this._renderer, this._stream, room, initialState);
      // // デバッグ用にレンダラ情報をコンソールに出力
      if (isDevelopment()) {
        console.log(this._renderer.info());
      }
    } catch (e) {
      throw e;
    }
  }
}