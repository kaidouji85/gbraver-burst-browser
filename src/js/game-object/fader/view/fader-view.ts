import * as THREE from "three";

import { FADE_RENDER_ORDER } from "../../../render/render-order/hud-render-order";
import type { FaderModel } from "../model/fader-model";
export const MESH_WIDTH = 1;
export const MESH_HEIGHT = 1;

/** 画面フェーダービュー */
export class FaderView {
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  constructor(z: number) {
    const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT);
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(23, 23, 23)",
      transparent: true,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.position.z = z;
    this.#mesh.renderOrder = FADE_RENDER_ORDER;
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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: FaderModel): void {
    this.#mesh.material.opacity = model.opacity;
    const isTransparent = 0 < model.opacity;
    this.#mesh.scale.x = isTransparent ? model.width / MESH_WIDTH : 1;
    this.#mesh.scale.y = isTransparent ? model.height / MESH_HEIGHT : 1;
  }
}
