// @flow

import {Renderer} from "../../game-object/renderer";
import {createRender} from "../../render/create-render";
import {isDevelopment} from "../../webpack/mode";
import {ThreeJSCanvasStream} from "./stream";
import {Observable, Subscription} from "rxjs";
import type {EndBattle} from "../../action/game/end-battle";
import type {Resources} from "../../resource";
import type {BattleRoom, InitialState} from "../../battle-room/battle-room";
import {BattleScene} from "./battle";
import type {Scene} from "./scene";

/** イベント通知 */
type Notifier = {
  endBattle: Observable<EndBattle>
};

/** three.js系シーンを集めたもの */
export class TDScenes {
  _stream: ThreeJSCanvasStream;
  _renderer: Renderer;
  _scene: ?Scene;
  _sceneSubscriptions: Subscription[];

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

    this._scene = null;
    this._sceneSubscriptions = [];
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._disposeScene();
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
   * @param resources リソース管理オブジェクト
   * @param room 戦闘ルーム
   * @param initialState 初期状態
   */
  startBattle(resources: Resources, room: BattleRoom, initialState: InitialState): void {
    this._disposeScene();

    const scene = new BattleScene({
      resources: resources,
      rendererDOM: this._renderer.getRendererDOM(),
      battleRoom: room,
      initialState: initialState,
      listener: {
        domEvent: this._renderer.notifier().domEvent,
        gameLoop: this._stream.gameLoop,
      }
    });
    this._scene = scene;
    this._sceneSubscriptions = [
      scene.notifier().render.subscribe(this._stream.render),
      scene.notifier().endBattle.subscribe(this._stream.endBattle)
    ];

    // デバッグ用にレンダラ情報をコンソールに出力
    if (isDevelopment()) {
      console.log(this._renderer.info());
    }
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  _disposeScene(): void {
    this._scene && this._scene.destructor();
    this._sceneSubscriptions.forEach(v => {
      v.unsubscribe();
    });
  }
}