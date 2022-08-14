// @flow

import * as THREE from "three";
import type {IlluminationModel} from "../model/illumination-model";

/**
 * ステージ全体の照明のビュー
 */
export class IlluminationView {
  #directionalLight1: typeof THREE.DirectionalLight;
  #directionalLight2: typeof THREE.DirectionalLight;
  #directionalLight3: typeof THREE.DirectionalLight;
  #directionalLight4: typeof THREE.DirectionalLight;
  #ambientLight: typeof THREE.AmbientLight;

  constructor() {
    this.#directionalLight1 = new THREE.DirectionalLight(0xAAAAAA);
    this.#directionalLight1.position.set(1, 1, 1);

    this.#directionalLight2 = new THREE.DirectionalLight(0xAAAAAA);
    this.#directionalLight2.position.set(-1, 1, 1);

    this.#directionalLight3 = new THREE.DirectionalLight(0xAAAAAA);
    this.#directionalLight3.position.set(1, -1, 1);

    this.#directionalLight4 = new THREE.DirectionalLight(0xAAAAAA);
    this.#directionalLight4.position.set(-1, -1, 1);

    this.#ambientLight = new THREE.AmbientLight(0xAAAAAA);
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.#directionalLight1,
      this.#directionalLight2,
      this.#directionalLight3,
      this.#directionalLight4,
      this.#ambientLight,
    ];
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: IlluminationModel): void {
    this.#updateIntensity(model);
  }

  /**
   * 照明の明るさを更新する
   *
   * @param model モデル
   */
  #updateIntensity(model: IlluminationModel): void {
    this.#directionalLight1.intensity = model.intensity * 0.8;
    this.#directionalLight2.intensity = model.intensity * 0.8;
    this.#directionalLight3.intensity = model.intensity * 0.6;
    this.#directionalLight4.intensity = model.intensity * 0.6;
    this.#ambientLight.intensity = model.intensity * 0.8;
  }
}