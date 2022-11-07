// @flow

import * as THREE from "three";
import { Group } from "three";

import type { Resources } from "../../../../resource";
import type { WingDozerModel } from "../model/wing-dozer-model";
import { createActiveMeshes } from "./active-meshes";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshes } from "./meshes";
import type { WingDozerView } from "./wing-dozer-view";

/** プレイヤー側 ウィングドーザ ビュー */
export class PlayerWingDozerView implements WingDozerView {
  /** グループ */
  #group: typeof THREE.Group;
  /** メッシュ */
  #meshes: AnimationMeshMapping[];
  /** アクティブメッシュ */
  #activeMeshes: AnimationMeshMapping[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this.#group = new Group();
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
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  engage(model: WingDozerModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;

    this.#group.scale.x = 1;
    this.#group.scale.y = 1;
    this.#group.scale.z = 1;

    const currentMesh = this.#meshes.find(
      (v) => v.type === model.animation.type
    );
    if (currentMesh) {
      currentMesh.mesh.animate(model.animation.frame);
      currentMesh.mesh.opacity(1);
    }

    const currentActiveMesh = this.#activeMeshes.find(
      (v) => v.type === model.animation.type
    );
    if (currentActiveMesh) {
      const activeOpacity =
        (0.25 + model.active.strength * 0.05) * model.active.opacity;
      currentActiveMesh.mesh.opacity(activeOpacity);
      currentActiveMesh.mesh.animate(model.animation.frame);
    }

    [...this.#meshes, ...this.#activeMeshes]
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh)
      .forEach(({ mesh }) => mesh.opacity(0));
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }
}
