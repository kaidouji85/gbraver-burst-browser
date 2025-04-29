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
import { ReflectIndocatorModel } from "../model/reflect-indocator-model";
import { ReflectIndicatorView } from "./reflect-indicator-view";

export const MESH_SIZE = 300;

/**
 * プレイヤー ダメージ反射 ビュー
 */
export class PlayerReflectIndicatorView implements ReflectIndicatorView {
  #mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const playerTurn = findTextureOrThrow(
      resources,
      TEXTURE_IDS.REFLECT,
    ).texture;
    this.#mesh = new HorizontalAnimationMesh({
      texture: playerTurn,
      maxAnimation: 1,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ReflectIndocatorModel): void {
    const target = this.#mesh.getObject3D();
    this.#mesh.opacity(model.opacity);
    target.position.x = ARMDOZER_EFFECT_STANDARD_X;
    target.position.y = ARMDOZER_EFFECT_STANDARD_Y + 10;
    target.position.z = ARMDOZER_EFFECT_STANDARD_Z + 40;
    target.scale.x = model.scale;
    target.scale.y = model.scale;
  }

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this.#mesh.getObject3D().quaternion.copy(camera.quaternion);
  }
}
