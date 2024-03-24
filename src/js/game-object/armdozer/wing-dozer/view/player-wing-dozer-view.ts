import * as THREE from "three";
import { Group } from "three";

import type { Resources } from "../../../../resource";
import { createAllMeshes } from "../mesh";
import { AnimationMesh } from "../mesh/animation-mesh";
import type { WingDozerModel } from "../model/wing-dozer-model";
import type { WingDozerView } from "./wing-dozer-view";

/** プレイヤー側 ウィングドーザ ビュー */
export class PlayerWingDozerView implements WingDozerView {
  /** グループ */
  #group: THREE.Group;
  /** メッシュ */
  #meshes: AnimationMesh[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new Group();
    this.#meshes = createAllMeshes(resources);
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

    const currentStandardMesh = this.#meshes.find(
      (v) =>
        v.meshType === "STANDARD" && v.animationType === model.animation.type,
    );
    if (currentStandardMesh) {
      currentStandardMesh.mesh.animate(model.animation.frame);
      currentStandardMesh.mesh.opacity(1);
      currentStandardMesh.mesh.color(
        model.standard.colorStrength,
        model.standard.colorStrength,
        model.standard.colorStrength,
      );
    }

    const currentOutlineMesh = this.#meshes.find(
      (v) =>
        v.meshType === "OUTLINE" && v.animationType === model.animation.type,
    );
    if (currentOutlineMesh) {
      currentOutlineMesh.mesh.opacity(model.outline.opacity);
      currentOutlineMesh.mesh.animate(model.animation.frame);
    }

    this.#meshes
      .filter((v) => v !== currentStandardMesh)
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
