import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../../../../render/render-order/td-render-order";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ShockWaveLineModel } from "../model/shock-wave-model";
import { LINE_Z_INDEX } from "./z-index";

/** メッシュ幅 */
export const WIDTH = 100;

/** メッシュ高 */
export const HEIGHT = 100;

/**
 * プレイヤーの衝撃波ビュー
 */
export class ShockWaveLineView {
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  #group: THREE.Group;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    const textureResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.HITMARK_SHOCK_WAVE_LINE,
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
    this.#mesh.position.x = WIDTH / 2;
    this.#group.add(this.#mesh);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveLineModel): void {
    this.#mesh.material.opacity = model.opacity;
    this.#group.position.set(
      model.distance * Math.cos(model.rotate),
      model.distance * Math.sin(model.rotate),
      LINE_Z_INDEX,
    );
    this.#group.rotation.z = model.rotate;
    this.#group.scale.set(model.scale, 1, 1);
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
