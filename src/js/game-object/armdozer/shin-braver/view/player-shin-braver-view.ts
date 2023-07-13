import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ShinBraverModel } from "../model/shin-braver-model";
import type { ShinBraverView } from "./shin-braver-view";
import { AnimationMeshMapping } from "../mesh/animation-mesh-mapping";
import { createMeshes } from "../mesh";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
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
  engage(model: ShinBraverModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;

    const currentStandardMesh = this.#meshes.find(
      (v) => 
        v.meshType === "STANDARD" &&
        v.animationType === model.animation.type,
    );
    if (currentStandardMesh) {
      currentStandardMesh.mesh.opacity(1);
      currentStandardMesh.mesh.animate(model.animation.frame);
      const colorStrength =
        1 - (0.2 + model.active.strength * 0.1) * model.active.opacity;
      currentStandardMesh.mesh.color(colorStrength, colorStrength, colorStrength);
    }

    const currentOutlineMesh = this.#meshes.find(
      (v) =>
        v.meshType === "OUTLINE" && 
        v.animationType === model.animation.type,
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
  addObject3D(object: THREE.Object3D): void {
    this.#group.add(object);
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
