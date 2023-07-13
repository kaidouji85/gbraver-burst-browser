import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import type { GenesisBraverView } from "./genesis-braver-view";

/** プレイヤー ジェネシスブレイバービュー */
export class PlayerGenesisBraverView implements GenesisBraverView {
  /** グループ */
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
  }

  /** @override */
  destructor() {

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
  }

  /** @override */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }
}
