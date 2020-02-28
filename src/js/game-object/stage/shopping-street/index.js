// @flow

import type {Resources} from '../../../resource';
import * as THREE from 'three';
import {City} from './city';
import {Stage} from "../stage";

/** 商店街 */
export default class ShoppingStreet implements Stage {
  _city: City;

  constructor(resources: Resources) {
    this._city = new City(resources);
    this._city.getObject3D().position.z = -50;
  }

  /** デストラクタ */
  destructor(): void {
    this._city.destructor();
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): THREE.Object3D[] {
    return [
      this._city.getObject3D(),
    ];
  }
}
