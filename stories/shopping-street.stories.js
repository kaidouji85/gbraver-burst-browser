// @flow
import * as THREE from "three";
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import ShoppingStreet from "../src/js/game-object/stage/shopping-street";
import {Illumination} from "../src/js/game-object/illumination/illumination";
import {skyBox} from "../src/js/game/td-scenes/battle/view/td/sky-box";
import {RxjsStreamSource} from "../src/js/stream/rxjs";
import type {Stream} from '../src/js/stream/core';
import {StorybookResourceRoot} from "./resource-root/storybook-resource-root";
import {fullResourceLoading} from "../src/js/resource";
import type {GameObjectAction} from "../src/js/game-object/action/game-object-action";
import {getViewPortHeight, getViewPortWidth} from "../src/js/view-port/view-port-size";

export default {
  title: 'shopping-street',
};

export const game = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction, scene}) => {
    const illumination = new Illumination(gameObjectAction);
    const backGround = new ShoppingStreet(resources);
    scene.background = skyBox(resources);
    return [...backGround.getThreeJsObjects(), ...illumination.getObject3Ds()];
  });
  stub.start();
  return stub.domElement();
}

export const highResolutionStillImage = (): HTMLElement => {
  const width = 7680;
  const height = 4320;
  const pixelRatio = 1;
  const distanceScale = 2;
  const position = {x: 0, y: 220 * distanceScale, z: 300 * distanceScale};
  const target = {x: 0, y: 200 * distanceScale, z: 0};
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);

  (async () => {
    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = fullResourceLoading(resourceRoot);
    const resources = await resourceLoading.resources;
    const emptyGameObjectAction: Stream<GameObjectAction> = new RxjsStreamSource();
    const scene = new THREE.Scene();
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z;
    camera.lookAt(target.x, target.y, target.z);
    const illumination = new Illumination(emptyGameObjectAction);
    const backGround = new ShoppingStreet(resources);
    scene.background = skyBox(resources);
    const object3Ds = [...illumination.getObject3Ds(), ...backGround.getThreeJsObjects()];
    object3Ds.forEach(v => {
      scene.add(v);
    });
    renderer.render(scene, camera);
  })();

  return renderer.domElement;
};