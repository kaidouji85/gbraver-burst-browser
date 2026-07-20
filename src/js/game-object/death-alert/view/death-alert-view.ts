import * as THREE from "three";

import { FADE_RENDER_ORDER } from "../../../render/render-order/hud-render-order";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { HUD_REARMOST_FADER_Z } from "../../hud-position";
import { DeathAlertModel } from "../model/death-alert-model";

/** メッシュの幅 */
export const MESH_WIDTH = 1;

/** メッシュの高さ */
export const MESH_HEIGHT = 1;

/** デスアラートビュー */
export class DeathAlertView {
  /** メッシュ */
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.resources リソース管理オブジェクト
   */
  constructor(options: ResourcesContainer) {
    const { resources } = options;
    const texture = findTextureOrThrow(
      resources,
      TEXTURE_IDS.DEATH_ALERT_VIGNETTE,
    );
    const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT);
    const material = new THREE.MeshBasicMaterial({
      color: "rgb(255, 0, 0)",
      transparent: true,
      alphaMap: texture.texture,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.position.z = HUD_REARMOST_FADER_Z;
    this.#mesh.renderOrder = FADE_RENDER_ORDER;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
  }

  /**
   * シーンに追加するための THREE.Object3D を取得する
   * @returns シーンに追加するための THREE.Object3D
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }

  /**
   * モデルをビューに反映する
   * @param model モデル
   */
  engage(model: DeathAlertModel): void {
    this.#mesh.material.opacity = model.opacity;
    const isTransparent = 0 < model.opacity;
    this.#mesh.scale.x = isTransparent ? model.width / MESH_WIDTH : 1;
    this.#mesh.scale.y = isTransparent ? model.height / MESH_HEIGHT : 1;
  }
}
