import * as THREE from "three";
import { Resources } from "../../../../resource";
import { GenesisBraverCutInModel } from "../model/genesis-braver-cutin-model";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { GenesisBraverCutInView } from "./genesis-braver-cutin-view";
import { createMeshes } from "./meshes";

/** プレイヤー ジェネシスブレイバー カットイン ビュー */
export class PlayerGenesisBraverCutInView implements GenesisBraverCutInView  {
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
    this.#meshes.forEach(({mesh}) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    this.#meshes.forEach(({mesh}) => {
      mesh.destructor();
    });
  }

  /** @override */
  engage(model: GenesisBraverCutInModel): void {
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = model.tracking.y;
    const currentMesh = this.#meshes.find(v => v.type === model.animation.type);
    if (currentMesh) {
      currentMesh.mesh.animate(model.animation.frame);
      currentMesh.mesh.setOpacity(model.opacity);
    }

    this.#meshes.filter(v => v !== currentMesh)
      .forEach(({mesh}) => {
        mesh.setOpacity(0);
      });
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;   
  }
}