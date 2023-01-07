import * as THREE from "three";
import type { Resources } from "../../../../resource";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import { createActiveMeshes } from "./active-meshes";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import type { LightningDozerView } from "./lightning-dozer-view";
import { createMeshes } from "./meshes";

/** プレイヤー側のライトニングドーザビュー */
export class PlayerLightingDozerView implements LightningDozerView {
  /** グループ */
  #group: THREE.Group;

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
    [...this.#meshes, ...this.#activeMeshes].forEach(({
      mesh
    }) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    [...this.#meshes, ...this.#activeMeshes].forEach(({
      mesh
    }) => {
      mesh.destructor();
    });
  }

  /** @override */
  engage(model: LightningDozerModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;
    const currentMesh = this.#meshes.find(v => v.type === model.animation.type);

    if (currentMesh) {
      currentMesh.mesh.opacity(1);
      currentMesh.mesh.animate(model.animation.frame);
    }

    const currentActiveMesh = this.#activeMeshes.find(v => v.type === model.animation.type);

    if (currentActiveMesh) {
      const activeOpacity = (0.25 + model.active.strength * 0.07) * model.active.opacity;
      currentActiveMesh.mesh.opacity(activeOpacity);
      currentActiveMesh.mesh.animate(model.animation.frame);
    }

    [...this.#meshes, ...this.#activeMeshes].filter(v => v !== currentMesh).filter(v => v !== currentActiveMesh).forEach(({
      mesh
    }) => {
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