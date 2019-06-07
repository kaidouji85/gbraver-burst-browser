// @flow

import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import SkyBox from './blue-sky';
import {shoppingStreetMesh} from './shopping-street';
import {Stage} from "../stage";

/** 商店街 */
export default class ShoppingStreet implements Stage {
  _skyBox: THREE.Mesh;
  _cityMesh: THREE.Mesh;
  _directionalLight: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;

  constructor(resources: Resources) {
    this._cityMesh = shoppingStreetMesh(resources);
    this._skyBox = SkyBox(resources);

    this._directionalLight = new THREE.DirectionalLight(0xAAAAAA, 0.8);
    this._directionalLight.position.set(0, 60, 200);

    this._ambientLight = new THREE.AmbientLight(0xAAAAAA);
  }

  /**
   * 本クラスに関連するオブジェクトを配列にまとめる
   *
   * @return 配列にまとめた結果
   */
  getThreeJsObjects(): THREE.Object3D[] {
    return [
      this._cityMesh,
      this._skyBox,
      this._directionalLight,
      this._ambientLight
    ];
  }
}
