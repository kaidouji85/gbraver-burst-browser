// @flow

import * as THREE from 'three';
import type {Resources} from '../../../resource';
import type {Stage} from "../stage";
import {City} from './city';

/** 商店街 */
export default class ShoppingStreet implements Stage {
  #city: City;

  constructor(resources: Resources) {
    this.#city = new City(resources);
    this.#city.getObject3D().position.z = -50;
  }

  /** デストラクタ */
  destructor(): void {
    this.#city.destructor();
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): typeof THREE.Object3D[] {
    return [
      this.#city.getObject3D(),
    ];
  }
}
