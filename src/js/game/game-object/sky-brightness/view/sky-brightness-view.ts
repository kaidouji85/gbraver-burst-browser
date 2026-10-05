import * as THREE from "three";

import type { SkyBrightnessModel } from "../model/sky-brightness-model";

/** 全体の大きさ */
export const SIZE = 5000;

/** 空の明るさビュー */
export class SkyBrightnessView {
  #mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

  constructor() {
    const geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(0, 0, 0)",
      side: THREE.BackSide,
      transparent: true,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: SkyBrightnessModel): void {
    const opacity = 1 - model.brightness;
    this.#mesh.material.opacity = opacity;
  }
}
