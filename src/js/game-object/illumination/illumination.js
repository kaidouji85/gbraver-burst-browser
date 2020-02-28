// @flow

import * as THREE from "three";

/**
 * ステージ全体の照明
 */
export class Illumination {
  _directionalLight1: THREE.DirectionalLight;
  _directionalLight2: THREE.DirectionalLight;
  _directionalLight3: THREE.DirectionalLight;
  _directionalLight4: THREE.DirectionalLight;
  _ambientLight: THREE.AmbientLight;

  constructor() {
    this._directionalLight1 = new THREE.DirectionalLight(0xAAAAAA);
    this._directionalLight1.position.set(1, 1, 1);

    this._directionalLight2 = new THREE.DirectionalLight(0xAAAAAA);
    this._directionalLight2.position.set(-1, 1, 1);

    this._directionalLight3 = new THREE.DirectionalLight(0xAAAAAA);
    this._directionalLight3.position.set(1, -1, 1);

    this._directionalLight4 = new THREE.DirectionalLight(0xAAAAAA);
    this._directionalLight4.position.set(-1, -1, 1);

    this._ambientLight = new THREE.AmbientLight(0xAAAAAA);

    this._updateIntensity(0.2);
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this._directionalLight1,
      this._directionalLight2,
      this._directionalLight3,
      this._directionalLight4,
      this._ambientLight,
    ];
  }

  /**
   * 照明の明るさを更新する
   *
   * @param intensity 照明の明るさ、値が大きいほど明るくなる
   */
  _updateIntensity(intensity: number): void {
    this._directionalLight1.intensity = intensity * 0.8;
    this._directionalLight2.intensity = intensity * 0.8;
    this._directionalLight3.intensity = intensity * 0.6;
    this._directionalLight4.intensity = intensity * 0.6;
    this._ambientLight.intensity = intensity;
  }
}