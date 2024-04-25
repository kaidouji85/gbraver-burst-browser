import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../../../../render/render-order/td-render-order";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ShockWaveRingModel } from "../model/shock-wave-model";
import { RING_Z_INDEX } from "./z-index";

/** メッシュ幅 */
export const WIDTH = 300;

/** メッシュ高 */
export const HEIGHT = 300;

/**
 * 衝撃波リングのビュー
 */
export class ShockWaveRingView {
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.HITMARK_SHOCK_WAVE_RING,
    );
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    const material = new THREE.MeshBasicMaterial({
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      map: texture,
    });
    const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 1, 1);
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.geometry.dispose();
    this.#mesh.material.dispose();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveRingModel): void {
    this.#mesh.scale.set(model.scale, model.scale, model.scale);
    this.#mesh.material.opacity = model.opacity;
    this.#mesh.position.z = RING_Z_INDEX;
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }
}
