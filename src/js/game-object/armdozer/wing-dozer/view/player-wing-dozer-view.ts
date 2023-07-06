import * as THREE from "three";
import { Group } from "three";

import type { Resources } from "../../../../resource";
import type { WingDozerModel } from "../model/wing-dozer-model";
import { createActiveMeshes } from "./active-meshes";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createMeshes } from "./meshes";
import { createOutlineMeshes } from "./outline-meshes";
import type { WingDozerView } from "./wing-dozer-view";

/** プレイヤー側 ウィングドーザ ビュー */
export class PlayerWingDozerView implements WingDozerView {
  /** グループ */
  #group: THREE.Group;
  /** メッシュ */
  #meshes: AnimationMeshMapping[];
  /** アクティブメッシュ */
  #activeMeshes: AnimationMeshMapping[];
  /** アウトラインメッシュ */
  #outlineMeshes: AnimationMeshMapping[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new Group();
    this.#meshes = createMeshes(resources);
    this.#activeMeshes = createActiveMeshes(resources);
    this.#outlineMeshes = createOutlineMeshes(resources);
    [...this.#meshes, ...this.#activeMeshes, ...this.#outlineMeshes].forEach(
      ({ mesh }) => {
        this.#group.add(mesh.getObject3D());
      }
    );
  }

  /** @override */
  destructor(): void {
    [...this.#meshes, ...this.#activeMeshes, ...this.#outlineMeshes].forEach(
      ({ mesh }) => {
        mesh.destructor();
      }
    );
  }

  /** @override */
  getObject3D(): THREE.Object3D {
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
        (0.4 + model.active.strength * 0.1) * model.active.opacity;
      currentActiveMesh.mesh.opacity(activeOpacity);
      currentActiveMesh.mesh.animate(model.animation.frame);
    }

    const currentOutlineMesh = this.#outlineMeshes.find(
      (v) => v.type === model.animation.type
    );
    if (currentOutlineMesh) {
      const outlineOpacity =
        (0.9 + model.active.strength * 0.1) * model.active.opacity;
      currentOutlineMesh.mesh.opacity(outlineOpacity);
      currentOutlineMesh.mesh.animate(model.animation.frame);
    }

    [...this.#meshes, ...this.#activeMeshes, ...this.#outlineMeshes]
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh)
      .filter((v) => v !== currentOutlineMesh)
      .forEach(({ mesh }) => mesh.opacity(0));
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#group.add(object);
  }
}
