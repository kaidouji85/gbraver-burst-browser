import { Observable, Subject } from "rxjs";
import * as THREE from "three";

import { GlobalTweenGroup } from "../../src/js/animation/global-tween-group";
import { GameLoop, gameLoopStream } from "../../src/js/game-loop/game-loop";
import { PreRender } from "../../src/js/game-loop/pre-render";
import { Update } from "../../src/js/game-loop/update";
import {
  GameObjectAction,
  gameObjectStream,
} from "../../src/js/game-object/action/game-object-action";
import { PlainHUDCamera } from "../../src/js/game-object/camera/plain-hud/plain-hud-camera";
import { Renderer } from "../../src/js/render";
import { OverlapEvent } from "../../src/js/render/overlap-event/overlap-event";
import { ResourcesContainer } from "../../src/js/resource";
import { developingFullResourceLoading } from "../../src/js/resource/loading/full-resource-loading";
import {
  createSafeAreaInset,
  SafeAreaInset,
} from "../../src/js/safe-area/safe-area-inset";
import { createSEPlayer, SEPlayerContainer } from "../../src/js/se/se-player";
import { Resize, resizeStream } from "../../src/js/window/resize";
import { StorybookResourceRoot } from "../storybook-resource-root";

/** Object3D生成関数パラメータ */
type Object3DParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * Object3D生成関数
 * @param params パラメータ
 * @returns シーンに追加するObject3D
 */
export type Object3DCreator = (params: Object3DParams) => THREE.Object3D[];

/** HUDレイヤー ゲームオブジェクト スタブ */
export class HUDGameObjectStub {
  /** 3Dオブジェクト生成関数 */
  #creator: Object3DCreator;
  /** セーフエリアインセット */
  #safeAreaInset: SafeAreaInset;
  /** リサイズ */
  #resize: Observable<Resize>;
  /** ゲームループ */
  #gameLoop: Observable<GameLoop>;
  /** アップデート */
  #update: Subject<Update>;
  /** プリレンダー */
  #preRender: Subject<PreRender>;
  /** レンダラー */
  #renderer: Renderer;
  /** カメラ */
  #camera: PlainHUDCamera;
  /** シーン */
  #scene: THREE.Scene;
  /** オーバーラップ */
  #overlap: Observable<OverlapEvent>;
  /** ゲームオブジェクトアクション */
  #gameObjectAction: Observable<GameObjectAction>;

  /**
   * コンストラクタ
   * @param creator Object3D生成関数
   */
  constructor(creator: Object3DCreator) {
    this.#creator = creator;
    this.#safeAreaInset = createSafeAreaInset();
    this.#resize = resizeStream();
    this.#gameLoop = gameLoopStream();
    this.#update = new Subject();
    this.#preRender = new Subject();
    this.#renderer = new Renderer(this.#resize);
    this.#scene = new THREE.Scene();
    this.#camera = new PlainHUDCamera(this.#resize);
    this.#overlap = this.#renderer.createOverlapNotifier(
      this.#camera.getCamera(),
    );
    this.#gameObjectAction = gameObjectStream(
      this.#update,
      this.#preRender,
      this.#overlap,
    );
    this.#gameLoop.subscribe((v) => {
      this.#onGameLoop(v);
    });
  }

  /**
   * シーンを開始する
   * @returns 実行結果
   */
  async start(): Promise<void> {
    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = developingFullResourceLoading(resourceRoot);
    const resources = await resourceLoading.resources;

    const object3Ds = this.#creator({
      resources,
      se: createSEPlayer(),
      gameObjectAction: this.#gameObjectAction,
    });

    object3Ds.forEach((object3D) => {
      this.#scene.add(object3D);
    });
  }

  /**
   * レンダリング対象のHTML要素を取得する
   *
   * @returns {HTMLElement}
   */
  domElement(): HTMLElement {
    return this.#renderer.getRendererDOM();
  }

  /**
   * ゲームループの処理
   * @param action アクション
   */
  #onGameLoop(action: GameLoop): void {
    GlobalTweenGroup.update(action.time);

    this.#update.next({
      type: "Update",
      time: action.time,
    });

    this.#preRender.next({
      type: "PreRender",
      camera: this.#camera.getCamera(),
      rendererDOM: this.#renderer.getRendererDOM(),
      safeAreaInset: this.#safeAreaInset,
    });

    this.#renderer.rendering(this.#scene, this.#camera.getCamera());
  }
}

/**
 * HUDレイヤー ゲームオブジェクト ストーリー
 * @param creator 3Dオブジェクト生成関数
 * @returns ストーリー
 */
export const hudGameObjectStory =
  (creator: Object3DCreator) => (): HTMLElement => {
    const stub = new HUDGameObjectStub(creator);
    stub.start();
    return stub.domElement();
  };
