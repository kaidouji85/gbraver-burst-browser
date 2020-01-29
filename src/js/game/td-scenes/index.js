// @flow

import {Renderer} from "../../game-object/renderer";
import {createRender} from "../../render/create-render";
import {isDevelopment} from "../../webpack/mode";
import {BoundSceneCache} from "./bound-scene-cache";
import {bindBattleScene} from "./battle/bind-battle-scene";
import {ThreeJSCanvasStream} from "./stream";
import {Observable, Subscription} from "rxjs";
import type {EndBattle} from "../../action/game/end-battle";
import type {StartBattle} from "../../action/game/start-battle";

/** イベント通知 */
type Notifier = {
  endBattle: Observable<EndBattle>
};

/** three.jsキャンバス全体を管理する */
export class ThreeJSCanvas {
  _stream: ThreeJSCanvasStream;
  _renderer: Renderer;
  _sceneCache: ?BoundSceneCache;
  _subscription: Subscription;

  constructor(parentDOM: HTMLElement, startBattle: Observable<StartBattle>) {
    this._stream = new ThreeJSCanvasStream();

    const threeJsRender = createRender();
    parentDOM.appendChild(threeJsRender.domElement);
    this._renderer = new Renderer({
      threeJsRender: threeJsRender,
      listener: {
        render: this._stream.render
      }
    });

    this._sceneCache = null;

    this._subscription = startBattle.subscribe(action => {
      this._onStartBattle(action);
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._sceneCache && this._sceneCache.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      endBattle: this._stream.endBattle
    };
  }

  /**
   * 戦闘開始時の処理
   *
   * @param action アクション
   */
  _onStartBattle(action: StartBattle): void {
    this._sceneCache && this._sceneCache.destructor();
    this._sceneCache = bindBattleScene(action.resources, this._renderer, this._stream, action.room, action.initialState);
    // デバッグ用にレンダラ情報をコンソールに出力
    if (isDevelopment()) {
      console.log(this._renderer.info());
    }
  }
}