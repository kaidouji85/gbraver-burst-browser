import * as THREE from "three";

import { FADE_RENDER_ORDER } from "../../../render/render-order/hud-render-order";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import type { FaderModel } from "../model/fader-model";
import type { FaderView } from "./fader-view";

/** メッシュの幅 */
export const MESH_WIDTH = 1;

/** メッシュの高さ */
export const MESH_HEIGHT = 1;

/** デスアラートフェーダー */
export class DeathAlertView implements FaderView {
  /** メッシュ */
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.resources リソース
   * @param options.z Z座標
   */
  constructor(options: { resources: Resources; z: number }) {
    const { z, resources } = options;
    const texture = findTextureOrThrow(resources, "DEATH_ALERT_VIGNETTE");
    const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT);
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(255, 0, 0)",
      transparent: true,
      map: texture.texture,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.position.z = z;
    this.#mesh.renderOrder = FADE_RENDER_ORDER;
  }

  /** @override */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }

  /** @override */
  engage(model: FaderModel): void {
    this.#mesh.material.opacity = model.opacity;
    const isTransparent = 0 < model.opacity;
    this.#mesh.scale.x = isTransparent ? model.width / MESH_WIDTH : 1;
    this.#mesh.scale.y = isTransparent ? model.height / MESH_HEIGHT : 1;
  }
}
