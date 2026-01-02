import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { Resources } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z,
} from "../../td-position";
import { EffectClearModel } from "../model/effect-clear-model";
import { EffectClearView } from "./effect-clear-view";

/** メッシュ幅 */
export const MESH_WIDTH = 300;

/** メッシュ高さ */
export const MESH_HEIGHT = 75;

/** プレイヤー 効果消去 ビュー */
export class PlayerEffectClearView implements EffectClearView {
  /** メッシュ */
  #mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const { texture } = findTextureOrThrow(resources, TEXTURE_IDS.EFFECT_CLEAR);
    this.#mesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation: 1,
      width: MESH_WIDTH,
      height: MESH_HEIGHT,
    });
  }

  /** @override */
  destructor(): void {
    this.#mesh.destructor();
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }

  /** @override */
  engage(model: EffectClearModel): void {
    const target = this.#mesh.getObject3D();
    this.#mesh.opacity(model.opacity);
    target.position.x = ARMDOZER_EFFECT_STANDARD_X - 30;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y - 20;
    target.position.z = ARMDOZER_EFFECT_STANDARD_Z + 40;
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#mesh.getObject3D().quaternion.copy(camera.quaternion);
  }
}
