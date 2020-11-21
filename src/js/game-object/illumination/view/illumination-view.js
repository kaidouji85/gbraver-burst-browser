// @flow

import * as THREE from "three";
import type {IlluminationModel} from "../model/illumination-model";

/**
 * ステージ全体の照明のビュー
 */
export class IlluminationView {
  _directionalLight1: typeof THREE.DirectionalLight;
  _directionalLight2: typeof THREE.DirectionalLight;
  _directionalLight3: typeof THREE.DirectionalLight;
  _directionalLight4: typeof THREE.DirectionalLight;
  _ambientLight: typeof THREE.AmbientLight;

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
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this._directionalLight1,
      this._directionalLight2,
      this._directionalLight3,
      this._directionalLight4,
      this._ambientLight,
    ];
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: IlluminationModel): void {
    this._updateIntensity(model);
  }

  /**
   * 照明の明るさを更新する
   *
   * @param model モデル
   */
  _updateIntensity(model: IlluminationModel): void {
    this._directionalLight1.intensity = model.intensity * 0.8;
    this._directionalLight2.intensity = model.intensity * 0.8;
    this._directionalLight3.intensity = model.intensity * 0.6;
    this._directionalLight4.intensity = model.intensity * 0.6;
    this._ambientLight.intensity = model.intensity * 0.8;
  }
}