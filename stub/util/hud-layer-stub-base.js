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
  gameLoop: (time: DOMHighResTimeStamp, gameObject: T) => void,
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
    const resources = await loadAllResource(params.resourceBashPath);
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
    const body = document.body || document.createElement('body');
    body.appendChild(rendered.domElement);

    const gameObject: T = params.init(resources);
    params.addScene(scene, gameObject);

    function gameLoop(time: DOMHighResTimeStamp) {
      requestAnimationFrame(gameLoop);
      params.gameLoop(time, gameObject);
      rendered.render(scene, camera);
    }
    requestAnimationFrame(gameLoop);
  }
}
