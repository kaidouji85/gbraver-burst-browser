// @flow

import TWEEN from "@tweenjs/tween.js";
import type {Render} from "../../src/js/game-loop/render";
import * as THREE from "three";
import {Observable, Subject, Subscription} from "rxjs";
import type {Resize} from "../../src/js/window/resize";
import {createResizeStream} from "../../src/js/window/resize";
import {Renderer} from "../../src/js/render";
import type {GameLoop} from "../../src/js/game-loop/game-loop";
import type {OverlapEvent} from "../../src/js/render/overlap-event/overlap-event";
import type {Update} from "../../src/js/game-loop/update";
import type {PreRender} from "../../src/js/game-loop/pre-render";
import {gameObjectStream} from "../../src/js/game-object/action/game-object-action";
import type {SafeAreaInset} from "../../src/js/safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../src/js/safe-area/safe-area-inset";
import {ResourceLoader} from "../../src/js/resource";
import {TDCamera} from "../../src/js/game-object/camera/td";
import type {Object3dCreator} from "./object3d-creator";
import {StorybookResourceRoot} from "../../src/js/resource/root/storybook-resource-root";
import {gameLoopStream} from "../../src/js/game-loop/game-loop";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";

/**
 * 3Dレイヤー ゲームオブジェクト スタブ
 */
export class TDGameObjectStub {
  _creator: Object3dCreator;

  _safeAreaInset: SafeAreaInset;
  _resize: Observable<Resize>;
  _gameLoop: Observable<GameLoop>;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;

  _renderer: Renderer;
  _camera: TDCamera;
  _scene: typeof THREE.Scene;

  _overlap: Observable<OverlapEvent>;
  _gameObjectAction: Observable<GameObjectAction>;

  _subscription: Subscription[];

  /**
   * コンストラクタ
   *
   * @param creator Object3D生成関数
   */
  constructor(creator: Object3dCreator) {
    this._creator = creator;

    this._safeAreaInset = createSafeAreaInset();
    this._resize = createResizeStream();
    this._gameLoop = gameLoopStream();
    this._update = new Subject<Update>();
    this._preRender = new Subject<PreRender>();
    this._render = new Subject<Render>();

    this._renderer = new Renderer({
      resize: this._resize,
      render: this._render,
    });
    this._scene = new THREE.Scene();
    this._camera = new TDCamera(this._update, this._resize);

    this._overlap = this._renderer.createOverlapNotifier(this._camera.getCamera());
    this._gameObjectAction = gameObjectStream(this._update, this._preRender, this._overlap);
    this._subscription = [
      this._gameLoop.subscribe(this._onGameLoop.bind(this))
    ];
  }

  /**
   * シーンを開始する
   *
   * @return 実行結果
   */
  async start(): Promise<void> {
    try {
      const resourceRoot = new StorybookResourceRoot();
      const loader = new ResourceLoader(resourceRoot);
      const resources = await loader.load();
      const object3Ds = this._creator(resources, this._gameObjectAction);
      object3Ds.forEach(object3D => {
        this._scene.add(object3D);
      });
    } catch(e) {
      throw e;
    }
  }

  /**
   * レンダリング対象のHTML要素を取得する
   *
   * @return {HTMLElement}
   */
  domElement(): HTMLElement{
    return this._renderer.getRendererDOM();
  }

  /**
   * ゲームループの処理
   *
   * @param action アクション
   */
  _onGameLoop(action: GameLoop): void {
    TWEEN.update(action.time);
    this._update.next({
      type: 'Update',
      time: action.time
    });
    this._preRender.next({
      type: 'PreRender',
      camera: this._camera.getCamera(),
      rendererDOM: this._renderer.getRendererDOM(),
      safeAreaInset: this._safeAreaInset,
    });
    this._render.next({
      type: 'Render',
      camera: this._camera.getCamera(),
      scene: this._scene,
    });
  }
}