// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import { createActiveMeshes } from "./active-meshes";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshes } from "./meshes";
import type { NeoLandozerView } from "./neo-landozer-view";

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  /** グループ */
  #group: typeof THREE.Group;
  /** メッシュ */
  #meshes: AnimationMeshMapping[];
  /** アクティブメッシュ */
  #activeMeshes: AnimationMeshMapping[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#meshes = createMeshes(resources);
    this.#activeMeshes = createActiveMeshes(resources);
    [...this.#meshes, ...this.#activeMeshes].forEach(({ mesh }) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    [...this.#meshes, ...this.#activeMeshes].forEach(({ mesh }) => {
      mesh.destructor();
    });
  }

  /** @override */
  engage(model: NeoLandozerModel): void {
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
        (0.25 + model.active.strength * 0.07) * model.active.opacity;
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
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }
}
