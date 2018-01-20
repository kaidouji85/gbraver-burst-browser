// @flow

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import type {Resources} from "../../src/resource/resource-manager";
import {ResourceManager} from "../../src/resource/resource-manager";

/**
 * HudLayerStubBaseコンストラクタのパラメータ
 *
 * @param T 生成するゲームオブジェクトの型
 */
export type Params<T> = {
  /** リソースパスのベース */
  resourceBashPath: string,
  /** ゲームオブジェクトを生成する */
  init: (resources: Resources) => T,
  /** 生成したゲームオブジェクトをシーンに追加する */
  addScene: (scene: THREE.Scene, gameObject: T) => void,
  /** ゲームオブジェクトのゲームループごとの処理を行う */
  gameLoop: (gameObject: T) => void,
};

/**
 * HUDレイヤーゲームオブジェクトの基本スタブ
 *
 * @param T 生成するゲームオブジェクトの型
 */
export class HudLayerStubBase<T> {

  constructor(params: Params<T>) {
    this.main(params);
  }

  async main(params: Params<T>) {
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

    const gameObject: T = params.init(resourceManager.resources);
    params.addScene(scene, gameObject);

    function gameLoop(time) {
      requestAnimationFrame(gameLoop);
      TWEEN.update(time);
      params.gameLoop(gameObject);
      rendered.render(scene, camera);
    }
    requestAnimationFrame(gameLoop);
  }
}
