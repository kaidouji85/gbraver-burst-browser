import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import { createActiveMeshes } from "./active-meshes";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import type { GenesisBraverView } from "./genesis-braver-view";
import { createMeshes } from "./meshes";

/** プレイヤー ジェネシスブレイバービュー */
export class PlayerGenesisBraverView implements GenesisBraverView {
  /** メッシュ */
  #meshes: AnimationMeshMapping[];
  /** アクティブメッシュ */
  #activeMeshes: AnimationMeshMapping[];
  /** グループ */
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#meshes = createMeshes(resources);
    this.#activeMeshes = createActiveMeshes(resources);
    this.#meshes.forEach(({ mesh }) => {
      this.#group.add(mesh.getObject3D());
    });
    this.#activeMeshes.forEach(({ mesh }) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor() {
    this.#meshes.forEach(({ mesh }) => {
      mesh.destructor();
    });
    this.#activeMeshes.forEach(({ mesh }) => {
      mesh.destructor();
    });
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /** @override */
  engage(model: GenesisBraverModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;
    const currentMesh = this.#meshes.find(
      (v) => v.type === model.animation.type
    );
    if (currentMesh) {
      currentMesh.mesh.opacity(1);
      currentMesh.mesh.animate(model.animation.frame);
    }

    const currentActiveMesh = this.#activeMeshes.find(
      (v) => v.type === model.animation.type
    );
    if (currentActiveMesh) {
      const activeOpacity =
        (0.4 + model.active.strength * 0.07) * model.active.opacity;
      currentActiveMesh.mesh.opacity(activeOpacity);
      currentActiveMesh.mesh.animate(model.animation.frame);
    }

    [...this.#meshes, ...this.#activeMeshes]
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh)
      .forEach(({ mesh }) => {
        mesh.opacity(0);
      });
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }
}
