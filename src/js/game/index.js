// @flow

import type {Resources} from "../resource";
import {Renderer} from "../game-object/renderer";
import {Subscription} from "rxjs";
import type {EndBattle} from "../action/game/end-battle";
import {createRender} from "../render/create-render";
import {createDummyBattleRoom} from "../battle-room/dummy-battle-room";
import {isDevelopment} from "../webpack/mode";
import {BoundSceneCache} from "./bind/bound-scene-cache";
import {bindBattleScene} from "./bind/bind-battle-scene";
import {GameStream} from "./stream";

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;
  _stream: GameStream;
  _renderer: Renderer;
  _sceneCache: ?BoundSceneCache;
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