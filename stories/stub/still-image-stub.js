// @flow
import * as THREE from "three";
import type {Stream} from "../../src/js/stream/core";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";
import {StorybookResourceRoot} from "../storybook-resource-root";
import {fullResourceLoading} from "../../src/js/resource";
import {RxjsStreamSource} from "../../src/js/stream/rxjs";
import type {Resources} from "../../src/js/resource";

type Renderer = {
  width: number,
  height: number,
  pixelRatio: number,
};

type Camera = {
  position: {x: number, y: number, z: number},
  target: {x: number, y: number, z: number},
};

type GameObjects = {
  objects: typeof THREE.Object3D[],
  backGround?: typeof THREE.CubeTexture,
};

type GameObjectsCreatorParams = {
  resources: Resources,
  emptyGameObjectAction: Stream<GameObjectAction>,
};

type GameObjectsCreator = (params: GameObjectsCreatorParams) => GameObjects;

type StubParams = {
  renderer: Renderer,
  camera: Camera,
  creator: GameObjectsCreator
};

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