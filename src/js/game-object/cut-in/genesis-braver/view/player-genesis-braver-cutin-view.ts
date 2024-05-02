import * as THREE from "three";

import { PreRender } from "../../../../game-loop/pre-render";
import { Resources } from "../../../../resource";
import { HUD_CUT_IN_ZNIDEX } from "../../../hud-zindex";
import { scaleBasedOnIPhoneXLandscapeHeight } from "../../../scale";
import { GenesisBraverCutInModel } from "../model/genesis-braver-cutin-model";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { GenesisBraverCutInView } from "./genesis-braver-cutin-view";
import { createMeshes } from "./meshes";

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/** プレイヤー ジェネシスブレイバー カットイン ビュー */
export class PlayerGenesisBraverCutInView implements GenesisBraverCutInView {
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
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    this.#meshes.forEach(({ mesh }) => {
      mesh.destructor();
    });
  }

  /** @override */
  engage(model: GenesisBraverCutInModel, preRender: PreRender): void {
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
      scaleBasedOnIPhoneXLandscapeHeight(
        preRender.rendererDOM,
        preRender.safeAreaInset,
      ) * model.scale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y - BASE_PADDING_TOP * scale;
    this.#group.position.z = HUD_CUT_IN_ZNIDEX;
    this.#group.scale.x = scale;
    this.#group.scale.y = scale;
    this.#group.scale.z = scale;
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
