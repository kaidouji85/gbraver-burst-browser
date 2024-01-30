import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { createAllMeshes } from "../mesh";
import { AnimationMesh } from "../mesh/animation-mesh";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import type { NeoLandozerView } from "./neo-landozer-view";

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  /** グループ */
  #group: THREE.Group;
  /** メッシュ */
  #meshes: AnimationMesh[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
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
  engage(model: NeoLandozerModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;

    const currentStandardMesh = this.#meshes.find(
      (v) =>
        v.meshType === "STANDARD" && v.animationType === model.animation.type,
    );
    if (currentStandardMesh) {
      currentStandardMesh.mesh.opacity(1);
      currentStandardMesh.mesh.animate(model.animation.frame);
      const colorStrength = 1 - 0.2 * model.active.opacity;
      currentStandardMesh.mesh.color(
        colorStrength,
        colorStrength,
        colorStrength,
      );
    }

    const currentOutlineMesh = this.#meshes.find(
      (v) =>
        v.meshType === "OUTLINE" && v.animationType === model.animation.type,
    );
    if (currentOutlineMesh) {
      const outlineOpacity = model.active.opacity;
      currentOutlineMesh.mesh.opacity(outlineOpacity);
      currentOutlineMesh.mesh.animate(model.animation.frame);
    }

    this.#meshes
      .filter((v) => v !== currentStandardMesh)
      .filter((v) => v !== currentOutlineMesh)
      .forEach(({ mesh }) => {
        mesh.opacity(0);
      });
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#group.add(object);
  }
}
