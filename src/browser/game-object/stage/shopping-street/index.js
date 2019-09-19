// @flow

import type {Resources} from '../../../resource';
import * as THREE from 'three';
import SkyBox from './blue-sky';
import {City} from './city';
import {Stage} from "../stage";

/** 商店街 */
export default class ShoppingStreet implements Stage {
  _skyBox: THREE.Mesh;
  _city: City;
  _directionalLight1: THREE.DirectionalLight;
  _directionalLight2: THREE.DirectionalLight;
  _directionalLight3: THREE.DirectionalLight;
  _directionalLight4: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;

  constructor(resources: Resources) {
    this._city = new City(resources);
    this._skyBox = SkyBox(resources);

    this._directionalLight1 = new THREE.DirectionalLight(0xAAAAAA, 0.8);
    this._directionalLight1.position.set(1, 1, 1);

    this._directionalLight2 = new THREE.DirectionalLight(0xAAAAAA, 0.8);
    this._directionalLight2.position.set(-1, 1, 1);

    this._directionalLight3 = new THREE.DirectionalLight(0xAAAAAA, 0.6);
    this._directionalLight3.position.set(1, -1, 1);

    this._directionalLight4 = new THREE.DirectionalLight(0xAAAAAA, 0.6);
    this._directionalLight4.position.set(-1, -1, 1);

    this._ambientLight = new THREE.AmbientLight(0xAAAAAA);
  }

  /** デストラクタ */
  destructor(): void {
    this._city.destructor();
    this._skyBox.geometry.dispose();
    this._skyBox.material.dispose();
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): THREE.Object3D[] {
    return [
      this._city.getObject3D(),
      this._skyBox,
      this._directionalLight1,
      this._directionalLight2,
      this._directionalLight3,
      this._directionalLight4,
      this._ambientLight,
    ];
  }
}
