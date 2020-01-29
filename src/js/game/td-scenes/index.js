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
import type {Resources} from "../../resource";
import type {BattleRoom, InitialState} from "../../battle-room/battle-room";

/** イベント通知 */
type Notifier = {
  endBattle: Observable<EndBattle>
};

/** three.js系シーンを集めたもの */
export class TDScenes {
  _stream: ThreeJSCanvasStream;
  _renderer: Renderer;
  _sceneCache: ?BoundSceneCache;

  constructor(parentDOM: HTMLElement) {
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
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._sceneCache && this._sceneCache.destructor();
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
   * 戦闘開始する
   *
   * @param action アクション
   */
  startBattle(resources: Resources, room: BattleRoom, initialState: InitialState): void {
    this._sceneCache && this._sceneCache.destructor();
    this._sceneCache = bindBattleScene(resources, this._renderer, this._stream, room, initialState);
    // デバッグ用にレンダラ情報をコンソールに出力
    if (isDevelopment()) {
      console.log(this._renderer.info());
    }
  }
}