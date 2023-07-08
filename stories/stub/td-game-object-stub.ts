import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import type { GameLoop } from "../../src/js/game-loop/game-loop";
import { gameLoopStream } from "../../src/js/game-loop/game-loop";
import type { PreRender } from "../../src/js/game-loop/pre-render";
import type { Update } from "../../src/js/game-loop/update";
import type { GameObjectAction } from "../../src/js/game-object/action/game-object-action";
import { gameObjectStream } from "../../src/js/game-object/action/game-object-action";
import { TDCamera } from "../../src/js/game-object/camera/td";
import { Renderer } from "../../src/js/render";
import type { OverlapEvent } from "../../src/js/render/overlap-event/overlap-event";
import type { Resources } from "../../src/js/resource";
import { developingFullResourceLoading } from "../../src/js/resource/loading/full-resource-loading";
import type { SafeAreaInset } from "../../src/js/safe-area/safe-area-inset";
import { createSafeAreaInset } from "../../src/js/safe-area/safe-area-inset";
import type { Resize } from "../../src/js/window/resize";
import { resizeStream } from "../../src/js/window/resize";
import { StorybookResourceRoot } from "../storybook-resource-root";

/** Object3D生成関数パラメータ */
type Object3DCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;

  /** カメラ */
  camera: TDCamera;
};

/** スタブに追加するthree.jsオブジェクト */
type Object3Ds = {
  /** スタブに追加するオブジェクト */
  objects: THREE.Object3D[];

  /** スタブのスカイボックス */
  skyBox?: THREE.CubeTexture;
};

/**
 * Object3D生成関数
 *
 * @param params パラメータ
 * @return シーンに追加するObject3D
 */
type Object3DCreator = (params: Object3DCreatorParams) => Object3Ds;

/** 3Dレイヤー ゲームオブジェクト スタブ */
export class TDGameObjectStub {
  _creator: Object3DCreator;
  _safeAreaInset: SafeAreaInset;
  _resize: Observable<Resize>;
  _gameLoop: Observable<GameLoop>;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _renderer: Renderer;
  _camera: TDCamera;
  _scene: THREE.Scene;
  _overlap: Observable<OverlapEvent>;
  _gameObjectAction: Observable<GameObjectAction>;
  _unsubscriber: Unsubscribable[];

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
    this._update = new Subject();
    this._preRender = new Subject();
    this._renderer = new Renderer(this._resize);
    this._scene = new THREE.Scene();
    this._camera = new TDCamera(this._update, this._resize);
    this._overlap = this._renderer.createOverlapNotifier(
      this._camera.getCamera(),
    );
    this._gameObjectAction = gameObjectStream(
      this._update,
      this._preRender,
      this._overlap,
    );
    this._unsubscriber = [
      this._gameLoop.subscribe((v) => {
        this._onGameLoop(v);
      }),
    ];
  }

  /**
   * シーンを開始する
   *
   * @return 実行結果
   */
  async start(): Promise<void> {
    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = developingFullResourceLoading(resourceRoot);
    const resources = await resourceLoading.resources;

    const { objects, skyBox } = this._creator({
      resources,
      gameObjectAction: this._gameObjectAction,
      camera: this._camera,
    });

    objects.forEach((object3D) => {
      this._scene.add(object3D);
    });
    this._scene.background = skyBox ?? null;
  }

  /**
   * レンダリング対象のHTML要素を取得する
   *
   * @return レンダリング対象HTML要素
   */
  domElement(): HTMLElement {
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
      type: "Update",
      time: action.time,
    });

    this._preRender.next({
      type: "PreRender",
      camera: this._camera.getCamera(),
      rendererDOM: this._renderer.getRendererDOM(),
      safeAreaInset: this._safeAreaInset,
    });

    this._renderer.rendering(this._scene, this._camera.getCamera());
  }
}
