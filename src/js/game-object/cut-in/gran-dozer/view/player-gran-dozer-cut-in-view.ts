import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { Resources } from "../../../../resource";
import { HUD_CUT_IN_Z } from "../../../hud-position";
import { hudScale } from "../../../scale";
import { GranDozerCutInModel } from "../model/gran-dozer-cut-in-model";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { GranDozerCutInView } from "./gran-dozer-cut-in-view";
import { createMeshes } from "./meshes";

/** ベースとなるpadding left */
export const BASE_PADDING_LEFT = 150;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/** プレイヤー グランドーザ カットイン ビュー */
export class PlayerGranDozerCutInView implements GranDozerCutInView {
  /** グループ */
  #group: THREE.Group;
  /** メッシュ */
  #meshes: AnimationMeshMapping[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#meshes = createMeshes(resources);
    this.#meshes.forEach(({ mesh }) => {
      const target = mesh.getObject3D();
      target.position.x = BASE_PADDING_LEFT;
      target.position.y = -BASE_PADDING_TOP;
      this.#group.add(target);
    });
  }

  /** @override */
  destructor(): void {
    this.#meshes.forEach(({ mesh }) => {
      mesh.destructor();
    });
  }

  /** @override */
  engage(model: GranDozerCutInModel, preRender: PreRender): void {
    const currentMesh = this.#meshes.find(
      (v) => v.type === model.animation.type,
    );
    if (currentMesh) {
      currentMesh.mesh.animate(model.animation.frame);
      currentMesh.mesh.opacity(model.opacity);
    }

    this.#meshes
      .filter((v) => v !== currentMesh)
      .forEach(({ mesh }) => {
        mesh.opacity(0);
      });

    const scale =
      hudScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y;
    this.#group.position.z = HUD_CUT_IN_Z;
    this.#group.scale.x = scale;
    this.#group.scale.y = scale;
    this.#group.scale.z = scale;
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
