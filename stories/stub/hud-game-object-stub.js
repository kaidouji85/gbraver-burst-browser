// @flow

import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import type {Resize} from "../../src/js/window/resize";
import {resizeStream} from "../../src/js/window/resize";
import {Renderer} from "../../src/js/render";
import type {GameLoop} from "../../src/js/game-loop/game-loop";
import type {OverlapEvent} from "../../src/js/render/overlap-event/overlap-event";
import type {Update} from "../../src/js/game-loop/update";
import type {PreRender} from "../../src/js/game-loop/pre-render";
import {gameObjectStream} from "../../src/js/game-object/action/game-object-action";
import type {SafeAreaInset} from "../../src/js/safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../src/js/safe-area/safe-area-inset";
import {fullResourceLoading} from "../../src/js/resource";
import {PlainHUDCamera} from "../../src/js/game-object/camera/plain-hud/plain-hud-camera";
import {StorybookResourceRoot} from "../resource-root/storybook-resource-root";
import {gameLoopStream} from "../../src/js/game-loop/game-loop";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";
import {RxjsStreamSource} from "../../src/js/stream/rxjs";
import type {Stream, StreamSource, Unsubscriber} from "../../src/js/stream/core";
import type {Resources} from "../../src/js/resource";

/** Object3D生成関数パラメータ */
type Object3DParams = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** シーン */
  scene: typeof THREE.Scene,
};

/**
 * Object3D生成関数
 *
 * @param params パラメータ
 * @return シーンに追加するObject3D
 */
export type Object3DCreator = (params: Object3DParams) => typeof THREE.Object3D[];

/** HUDレイヤー ゲームオブジェクト スタブ */
export class HUDGameObjectStub {
  _creator: Object3DCreator;
  _safeAreaInset: SafeAreaInset;
  _resize: Stream<Resize>;
  _gameLoop: Stream<GameLoop>;
  _update: StreamSource<Update>;
  _preRender: StreamSource<PreRender>;
  _renderer: Renderer;
  _camera: PlainHUDCamera;
  _scene: typeof THREE.Scene;
  _overlap: Stream<OverlapEvent>;
  _gameObjectAction: Stream<GameObjectAction>;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param creator Object3D生成関数
   */
  constructor(creator: Object3DCreator) {
    this._creator = creator;

    this._safeAreaInset = createSafeAreaInset();
    this._resize = resizeStream();
    this._gameLoop = gameLoopStream();
    this._update = new RxjsStreamSource();
    this._preRender = new RxjsStreamSource();

    this._renderer = new Renderer(this._resize);
    this._scene = new THREE.Scene();
    this._camera = new PlainHUDCamera(this._resize);

    this._overlap = this._renderer.createOverlapNotifier(this._camera.getCamera());
    this._gameObjectAction = gameObjectStream(this._update, this._preRender, this._overlap);
    this._unsubscriber = [
      this._gameLoop.subscribe(v => {
        this._onGameLoop(v);
      })
    ];
  }

  /**
   * シーンを開始する
   *
   * @return 実行結果
   */
  async start(): Promise<void> {
    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = fullResourceLoading(resourceRoot);
    const resources = await resourceLoading.resources;
    const object3Ds = this._creator({resources, gameObjectAction: this._gameObjectAction, scene: this._scene});
    object3Ds.forEach(object3D => {
      this._scene.add(object3D);
    });
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
    this._update.next({type: 'Update', time: action.time});
    this._preRender.next({type: 'PreRender', camera: this._camera.getCamera(),
      rendererDOM: this._renderer.getRendererDOM(), safeAreaInset: this._safeAreaInset});
    this._renderer.rendering(this._scene, this._camera.getCamera());
  }
}