// @flow

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import type {Resources} from "../../src/resource/resource-manager";
import {ResourceManager} from "../../src/resource/resource-manager";

export interface HudGameObject  {
  gameLoop(): void;
  getThreeJsObjectList(): THREE.Object[]
};

export type Params = {
  resourceBashPath: string,
  init: (resources: Resources) => HudGameObject,
};

/** HUDレイヤーゲームオブジェクトのスタブ */
export class HudLayerSutb {

  constructor(params: Params) {
    this.main(params);
  }

  async main(params: Params) {
    const resourceManager = new ResourceManager(params.resourceBashPath);
    await resourceManager.load();

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0,
      30
    );
    const rendered = new THREE.WebGLRenderer();
    rendered.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendered.domElement);

    const gameObject = params.init(resourceManager.resources);
    gameObject.getThreeJsObjectList().forEach(v => scene.add(v));

    function gameLoop(time) {
      requestAnimationFrame(gameLoop);
      TWEEN.update(time);
      gameObject.gameLoop();
      rendered.render(scene, camera);
    }
    requestAnimationFrame(gameLoop);
  }
}
