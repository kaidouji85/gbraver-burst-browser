import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import type { LightningDozerView } from "./lightning-dozer-view";
import { createMeshes } from "./meshes";
import { createOutlineMeshes } from "./outline-meshes";

/** プレイヤー側のライトニングドーザビュー */
export class PlayerLightingDozerView implements LightningDozerView {
  /** グループ */
  #group: THREE.Group;
  /** メッシュ */
  #meshes: AnimationMeshMapping[];
  /** アウトラインメッシュ */
  #outlineMeshes: AnimationMeshMapping[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#meshes = createMeshes(resources);
    this.#outlineMeshes = createOutlineMeshes(resources);
    [...this.#meshes, ...this.#outlineMeshes].forEach(({ mesh }) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    [...this.#meshes, ...this.#outlineMeshes].forEach(({ mesh }) => {
      mesh.destructor();
    });
  }

  /** @override */
  engage(model: LightningDozerModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;

    const currentMesh = this.#meshes.find(
      (v) => v.type === model.animation.type,
    );
    if (currentMesh) {
      currentMesh.mesh.opacity(1);
      currentMesh.mesh.animate(model.animation.frame);
      const colorStrength =
        1 - (0.2 + model.active.strength * 0.1) * model.active.opacity;
      currentMesh.mesh.color(colorStrength, colorStrength, colorStrength);
    }

    const currentOutlineMesh = this.#outlineMeshes.find(
      (v) => v.type === model.animation.type,
    );
    if (currentOutlineMesh) {
      const outlineOpacity =
        (0.9 + model.active.strength * 0.1) * model.active.opacity;
      currentOutlineMesh.mesh.opacity(outlineOpacity);
      currentOutlineMesh.mesh.animate(model.animation.frame);
    }

    [...this.#meshes, ...this.#outlineMeshes]
      .filter((v) => v !== currentMesh)
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
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }
}
