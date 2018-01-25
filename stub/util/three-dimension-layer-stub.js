// @flow

import * as THREE from 'three';
import type {Resources} from "../../src/resource/index";
import {loadAllResource} from "../../src/resource";

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
  gameLoop: (time: DOMHighResTimeStamp, camera: THREE.Camera, gameObject: T) => void,
};

/**
 * 3Dレイヤーゲームオブジェクトの基本スタブ
 *
 * @param T 生成するゲームオブジェクトの型
 */
export class ThreeDimensionLayerStubBase<T> {

  constructor(params: Params<T>) {
    this.main(params);
  }

  async main(params: Params<T>) {
    const resources = await loadAllResource(params.resourceBashPath);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 900;
    camera.position.y = 200;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const rendered = new THREE.WebGLRenderer();
    rendered.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendered.domElement);

    const gameObject: T = params.init(resources);
    params.addScene(scene, gameObject);

    function gameLoop(time: DOMHighResTimeStamp) {
      requestAnimationFrame(gameLoop);
      params.gameLoop(time, camera, gameObject);
      rendered.render(scene, camera);
    }
    requestAnimationFrame(gameLoop);
  }
}
