import * as THREE from "three";

import type { IlluminationModel } from "../model/illumination-model";

/** ベースとなる照明の色 */
const BaseLightColor = {
  r: 170 / 255,
  g: 170 / 255,
  b: 170 / 255,
};

/**
 * three.jsのライトにモデルを反映させる
 * @param light モデルを反映させるthree.jsのライト
 * @param model モデル
 * @param intensityScale 光の強さのスケール
 */
const engageLight = (
  light: THREE.Light,
  model: IlluminationModel,
  intensityScale: number,
): void => {
  light.color.setRGB(
    BaseLightColor.r * model.color.r,
    BaseLightColor.g * model.color.g,
    BaseLightColor.b * model.color.b,
    THREE.SRGBColorSpace,
  );
  // three.js r155 から intensity に内部的にPIを乗算しないようになったので
  // 前のバージョンと同じ照明になるようにPIを乗算している
  // https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733
  light.intensity = model.intensity * Math.PI * intensityScale;
};

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
    this.#directionalLight1 = new THREE.DirectionalLight();
    this.#directionalLight1.position.set(1, 1, 1);
    this.#directionalLight2 = new THREE.DirectionalLight();
    this.#directionalLight2.position.set(-1, 1, 1);
    this.#directionalLight3 = new THREE.DirectionalLight();
    this.#directionalLight3.position.set(1, -1, 1);
    this.#directionalLight4 = new THREE.DirectionalLight();
    this.#directionalLight4.position.set(-1, -1, 1);
    this.#ambientLight = new THREE.AmbientLight();
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
    engageLight(this.#directionalLight1, model, 0.8);
    engageLight(this.#directionalLight2, model, 0.8);
    engageLight(this.#directionalLight3, model, 0.6);
    engageLight(this.#directionalLight4, model, 0.6);
    engageLight(this.#ambientLight, model, 0.8);
  }
}
