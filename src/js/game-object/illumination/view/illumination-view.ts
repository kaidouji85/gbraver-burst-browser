import * as THREE from "three";

import type { IlluminationModel } from "../model/illumination-model";

/** ステージ全体の照明 ビュー */
export class IlluminationView {
  #directionalLight1: THREE.DirectionalLight;
  #directionalLight2: THREE.DirectionalLight;
  #directionalLight3: THREE.DirectionalLight;
  #directionalLight4: THREE.DirectionalLight;
  #ambientLight: THREE.AmbientLight;

  /**
   * コンストラクタ
   */
  constructor() {
    const lightColor = 0xaaaaaa;
    this.#directionalLight1 = new THREE.DirectionalLight(lightColor);
    this.#directionalLight1.position.set(1, 1, 1);
    this.#directionalLight2 = new THREE.DirectionalLight(lightColor);
    this.#directionalLight2.position.set(-1, 1, 1);
    this.#directionalLight3 = new THREE.DirectionalLight(lightColor);
    this.#directionalLight3.position.set(1, -1, 1);
    this.#directionalLight4 = new THREE.DirectionalLight(lightColor);
    this.#directionalLight4.position.set(-1, -1, 1);
    this.#ambientLight = new THREE.AmbientLight(lightColor);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#directionalLight1.dispose();
    this.#directionalLight2.dispose();
    this.#directionalLight3.dispose();
    this.#directionalLight4.dispose();
    this.#ambientLight.dispose();
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
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
   * @param model モデル
   */
  engage(model: IlluminationModel): void {
    // three.js r155 から intensity に内部的にPIを乗算しないようになったので
    // 前のバージョンと同じ照明になるようにPIを乗算している
    // https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733
    this.#directionalLight1.intensity = model.intensity * Math.PI * 0.8;
    this.#directionalLight2.intensity = model.intensity * Math.PI * 0.8;
    this.#directionalLight3.intensity = model.intensity * Math.PI * 0.6;
    this.#directionalLight4.intensity = model.intensity * Math.PI * 0.6;
    this.#ambientLight.intensity = model.intensity * Math.PI * 0.8;
  }
}
