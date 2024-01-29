import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { createAllMeshes } from "../mesh";
import { AnimationMesh } from "../mesh/animation-mesh";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import type { GenesisBraverView } from "./genesis-braver-view";

/** プレイヤー ジェネシスブレイバービュー */
export class PlayerGenesisBraverView implements GenesisBraverView {
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
  destructor() {
    this.#meshes.forEach(({ mesh }) => {
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

    const currentStandardMesh = this.#meshes.find(
      (v) =>
        v.meshType === "STANDARD" && v.animationType === model.animation.type,
    );
    if (currentStandardMesh) {
      currentStandardMesh.mesh.opacity(1);
      currentStandardMesh.mesh.animate(model.animation.frame);
      const colorStrength =
        1 - (0.2 + model.active.strength * 0.1) * model.active.opacity;
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
      const outlineOpacity =
        (0.9 + model.active.strength * 0.1) * model.active.opacity;
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
  addObject3D(object: THREE.Object3D): void {
    this.#group.add(object);
  }
}
