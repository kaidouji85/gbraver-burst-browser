// @flow
import * as THREE from "three";
import type {Stream} from "../../src/js/stream/core";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";
import {StorybookResourceRoot} from "../storybook-resource-root";
import {fullResourceLoading} from "../../src/js/resource";
import {RxjsStreamSource} from "../../src/js/stream/rxjs";
import type {Resources} from "../../src/js/resource";

/** レンダラ設定 */
type Renderer = {
  /** 幅 */
  width: number,
  /** 高さ */
  height: number,
  /** ピクセルレート */
  pixelRatio: number,
};

/** カメラ設定 */
type Camera = {
  /** カメラ位置 */
  position: {
    /** x座標 */
    x: number,
    /** y座標 */
    y: number,
    /** z座標 */
    z: number
  },
  /** 注視点 */
  target: {
    /** x座標 */
    x: number,
    /** y座標 */
    y: number,
    /** z座標 */
    z: number
  },
};

/** スタブに追加するthree.jsオブジェクト */
type Object3Ds = {
  objects: typeof THREE.Object3D[],
  backGround?: typeof THREE.CubeTexture,
};

/** three.jsオブジェクトジェネレータのパラメータ */
type Object3DsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 空のゲームオブジェクトアクション */
  emptyGameObjectAction: Stream<GameObjectAction>,
};

/**
 * three.jsオブジェクトジェネレータ
 *
 * @param params パラメータ
 * @return スタブに追加するオブジェクト群
 */
type Object3DsCreator = (params: Object3DsCreatorParams) => Object3Ds;

/** スタブのパラメータ */
type StubParams = {
  /** レンダラ設定 */
  renderer: Renderer,
  /** カメラ設定 */
  camera: Camera,
  /** three.jsオブジェクトジェネレータ */
  creator: Object3DsCreator
};

/**
 * 静止画スタブ
 *
 * @param params パラメータ
 * @return storybookが利用するHTMLElement
 */
export function stillImageStub(params: StubParams): HTMLElement {
  const renderer = new THREE.WebGLRenderer();
  const {pixelRatio, width, height} = params.renderer;
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);

  (async () => {
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
    const {position, target} = params.camera;
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z;
    camera.lookAt(target.x, target.y, target.z);

    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = fullResourceLoading(resourceRoot);
    const resources = await resourceLoading.resources;
    const emptyGameObjectAction: Stream<GameObjectAction> = new RxjsStreamSource();
    const {objects, backGround} = params.creator({resources, emptyGameObjectAction});
    const scene = new THREE.Scene();
    objects.forEach(v => {
      scene.add(v);
    });
    scene.background = backGround ?? null;
    renderer.render(scene, camera);
  })();

  return renderer.domElement;
}