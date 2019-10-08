// @flow

import * as THREE from 'three';
import type {DOMEvent} from "../../../../action/dom-event";
import {PlainHUDCamera} from "../../../../game-object/camera/plain-hud";
import {merge, Observable, Subject, Subscription} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {Update} from "../../../../action/game-loop/update";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {Render} from "../../../../action/game-loop/render";
import {TitleLogo} from "../../../../game-object/title-logo";
import {toOverlapObservable} from "../../../../action/overlap/dom-event-to-overlap";
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {Resources} from "../../../../resource";
import type {OverlapAction} from "../../../../action/overlap";
import {map} from "rxjs/operators";

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
};

/** タイトルシーン HUDレイヤー */
export class TitleHudLayer {
  scene: THREE.Scene;
  camera: PlainHUDCamera;
  titleLogo: TitleLogo;

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
    this.camera = new PlainHUDCamera({
      listener: {
        domEvent: param.listener.domEvent
      }
    });

    const gameObjectAction: Observable<GameObjectAction> = merge(
      this._update,
      this._preRender,
      toOverlapObservable(param.listener.domEvent, this._rendererDOM, this.camera.getCamera())
    ).pipe(
      map(v => {
        const ret: GameObjectAction = v;
        return ret;
      })
    );

    this.titleLogo = new TitleLogo(param.resources, gameObjectAction);
    this.scene.add(this.titleLogo.getObject3D());

    this._subscription = param.listener.gameLoop.subscribe(action => {
      this._onGameLoop(action);
    });
  }

  /** デストラクタ相当処理 */
  destructor(): void {
    this.camera.destructor();
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
   * ゲームループの際の処理
   *
   * @param action ゲームループアクション
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