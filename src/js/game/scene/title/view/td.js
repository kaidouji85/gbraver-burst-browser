// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {Observable, Subject, Subscription} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {DOMEvent} from "../../../../action/dom-event";
import {Battle3DCamera} from "../../../../game-object/camera/battle-3d";
import type {Stage} from "../../../../game-object/stage/stage";
import type {Update} from "../../../../action/game-loop/update";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {Render} from "../../../../action/game-loop/render";
import ShoppingStreet from "../../../../game-object/stage/shopping-street";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>
}

/** タイトルシーン3Dレイヤー */
export class TitleTDLayer {
  scene: THREE.Scene;
  camera: Battle3DCamera; // TODO タイトルシーン専用のカメラを作成する
  stage: Stage;

  _rendererDOM: HTMLElement;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;
  _subscription: Subscription;

  constructor(param: Param) {
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = new Subject();
    this._rendererDOM = param.rendererDOM;

    this.scene = new THREE.Scene();
    this.camera = new Battle3DCamera({
      listener: {
        domEvent: param.listener.domEvent,
        update: this._update
      }
    });

    this.stage = new ShoppingStreet(param.resources);
    this.stage.getThreeJsObjects().forEach(v => {
      this.scene.add(v);
    });

    this._subscription = param.listener.gameLoop.subscribe(action => {
      this._onGameLoop(action);
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.scene.dispose();
    this.camera.destructor();
    this.stage.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * イベント通知ストリームを取得する
   * 
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._render
    };
  }

  /**
   * ゲームループ時の処理
   *
   * @param action アクション
   */
  _onGameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera(),
      rendererDOM: this._rendererDOM,
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }
}