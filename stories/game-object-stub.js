// @flow

import type {Render} from "../src/js/action/game-loop/render";
import * as THREE from "three";
import {Observable, Subject, Subscription} from "rxjs";
import type {Resize} from "../src/js/action/resize/resize";
import {createResizeStream} from "../src/js/action/resize/resize";
import {createRender} from "../src/js/render/create-render";
import {Renderer} from "../src/js/game-object/renderer";
import type {GameLoop} from "../src/js/action/game-loop/game-loop";
import {gameLoopStream} from "../src/js/action/game-loop/game-loop-stream";
import {getViewPortHeight, getViewPortWidth} from "../src/js/view-port/view-port-size";
import {toOverlapStream} from "../src/js/action/overlap/overlap-stream";
import type {OverlapAction} from "../src/js/action/overlap";
import type {Update} from "../src/js/action/game-loop/update";
import type {PreRender} from "../src/js/action/game-loop/pre-render";
import type {GameObjectAction} from "../src/js/action/game-object-action";
import {gameObjectStream} from "../src/js/action/game-object-action/game-object-stream";
import {createSafeAreaInset} from "../src/js/safe-area/safe-area-inset";
import type {SafeAreaInset} from "../src/js/safe-area/safe-area-inset";
import {createDOMEventStream} from "../src/js/action/td-dom";
import type {TdDOMEvent} from "../src/js/action/td-dom";
import type {Resources} from "../src/js/resource";
import {loadAllResource} from "../src/js/resource";

type Object3dCreator  = (resources: Resources, listener: Observable<GameObjectAction>) => THREE.Object3D[];

/**
 * ゲームオブジェクト スタブ
 */
export class GameObjectStub {
  _scene: THREE.Scene;
  _camera: THREE.Camera;
  _threeJsRenderer: THREE.Renderer;
  _safeAreaInset: SafeAreaInset;
  _domEvent: Observable<TdDOMEvent>;
  _gameLoop: Observable<GameLoop>;
  _resize: Observable<Resize>;
  _render: Subject<Render>;
  _overlap: Observable<OverlapAction>;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _gameObjectAction: Observable<GameObjectAction>;
  _renderer: Renderer;
  _subscription: Subscription[];

  constructor() {
    this._scene = new THREE.Scene();
    const aspect = getViewPortWidth() / getViewPortHeight();
    this._camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
    this._threeJsRenderer = createRender();
    this._safeAreaInset = createSafeAreaInset();

    this._domEvent = createDOMEventStream(this._threeJsRenderer.domElement);
    this._gameLoop = gameLoopStream();
    this._update = new Subject<Update>();
    this._preRender = new Subject<PreRender>();
    this._resize = createResizeStream();
    this._render = new Subject();
    this._overlap = toOverlapStream(this._domEvent, this._threeJsRenderer.domElement, this._camera);
    this._gameObjectAction = gameObjectStream(this._update, this._preRender, this._overlap);


    this._renderer = new Renderer({
      resize: this._resize,
      renderStream: this._render,
      threeJsRender: this._threeJsRenderer
    });

    this._subscription = [
      this._gameLoop.subscribe(this._onGameLoop.bind(this))
    ];
  }

  async start(creator: Object3dCreator): Promise<void> {
    try {
      console.log('start');
      const resources = await loadAllResource('/');
      console.log(resources);
      console.log('complete load resource');
      const object3Ds = creator(resources, this._gameObjectAction);
      object3Ds.forEach(object3D => {
        this._scene.add(object3D);
      });
    } catch(e) {
      throw e;
    }
  }

  domElement(): HTMLElement{
    return this._threeJsRenderer.domElement;
  }

  /**
   * ゲームループの処理
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
      camera: this._camera,
      rendererDOM: this._renderer.getRendererDOM(),
      safeAreaInset: this._safeAreaInset,
    });
    this._render.next({
      type: 'Render',
      camera: this._camera,
      scene: this._scene,
    });
  }
}