// @flow

import TWEEN from "@tweenjs/tween.js";
import type {Render} from "../../src/js/action/game-loop/render";
import * as THREE from "three";
import {Observable, Subject, Subscription} from "rxjs";
import type {Resize} from "../../src/js/dom/resize/resize";
import {createResizeStream} from "../../src/js/dom/resize/resize";
import {Renderer} from "../../src/js/game-object/renderer";
import type {GameLoop} from "../../src/js/action/game-loop/game-loop";
import {gameLoopStream} from "../../src/js/action/game-loop/game-loop-stream";
import {toOverlapStream} from "../../src/js/action/overlap/overlap-stream";
import type {OverlapAction} from "../../src/js/action/overlap";
import type {Update} from "../../src/js/action/game-loop/update";
import type {PreRender} from "../../src/js/action/game-loop/pre-render";
import type {GameObjectAction} from "../../src/js/action/game-object-action";
import {gameObjectStream} from "../../src/js/action/game-object-action/game-object-stream";
import type {SafeAreaInset} from "../../src/js/safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../src/js/safe-area/safe-area-inset";
import {ResourceLoader} from "../../src/js/resource";
import {PlainHUDCamera} from "../../src/js/game-object/camera/plain-hud";
import type {Object3dCreator} from "./object3d-creator";
import {StorybookResourceRoot} from "../../src/js/resource/root/storybook-resource-root";

/**
 * HUDレイヤー ゲームオブジェクト スタブ
 */
export class HUDGameObjectStub {
  _creator: Object3dCreator;

  _safeAreaInset: SafeAreaInset;
  _resize: Observable<Resize>;
  _gameLoop: Observable<GameLoop>;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;

  _renderer: Renderer;
  _camera: PlainHUDCamera;
  _scene: typeof THREE.Scene;

  _overlap: Observable<OverlapAction>;
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
    this._camera = new PlainHUDCamera(this._resize);

    this._overlap = toOverlapStream(
      this._renderer.notifier().domEvent,
      this._renderer.getRendererDOM(),
      this._camera.getCamera()
    );
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