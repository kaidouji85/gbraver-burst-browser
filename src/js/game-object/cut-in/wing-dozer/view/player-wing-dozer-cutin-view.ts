import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HUD_CUT_IN_Z } from "../../../hud-position";
import { hudScale } from "../../../scale";
import {
  AnimationType,
  WingDozerCutInModel,
} from "../model/wing-dozer-cutin-model";
import { WingDozerCutInView } from "./wing-dozer-cutin-view";

/** メッシュの大きさ */
export const MESH_SIZE = 1000;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/**
 * プレイヤー側 ウィングドーザ カットイン ビュー
 */
export class PlayerWingDozerCutInView implements WingDozerCutInView {
  #burstUp: HorizontalAnimationMesh;
  #burstDown: HorizontalAnimationMesh;
  #group: THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const burstUp = findTextureOrThrow(
      resources,
      TEXTURE_IDS.WING_DOZER_BURST_UP,
    ).texture;
    this.#burstUp = new HorizontalAnimationMesh({
      texture: burstUp,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4,
    });
    const burstDown = findTextureOrThrow(
      resources,
      TEXTURE_IDS.WING_DOZER_BURST_DOWN,
    ).texture;
    this.#burstDown = new HorizontalAnimationMesh({
      texture: burstDown,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4,
    });
    this.#group = new THREE.Group();
    this.#getAllMeshes().forEach((mesh) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#getAllMeshes().forEach((v) => {
      v.destructor();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: WingDozerCutInModel, preRender: PreRender): void {
    const activeMesh = this.#getActiveMesh(model.animation.type);
    activeMesh.opacity(model.opacity);
    activeMesh.animate(model.animation.frame);
    const disactiveMeshes = this.#getAllMeshes().filter(
      (v) => v !== activeMesh,
    );
    disactiveMeshes.forEach((v) => {
      v.opacity(0);
    });
    const scale =
      hudScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    this.#group.scale.set(scale, scale, scale);
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y - BASE_PADDING_TOP * scale;
    this.#group.position.z = HUD_CUT_IN_Z;
  }

  /**
   * 本クラスに含まれる全メッシュを取得する
   *
   * @returns 取得結果
   */
  #getAllMeshes(): HorizontalAnimationMesh[] {
    return [this.#burstUp, this.#burstDown];
  }

  /**
   * アニメーションタイプに応じたメッシュを返す
   *
   * @param type アニメーションタイプ
   * @returns アニメーションタイプに応じたメッシュ
   */
  #getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case "BURST_UP":
        return this.#burstUp;

      case "BURST_DOWN":
        return this.#burstDown;

      default:
        return this.#burstUp;
    }
  }
}
