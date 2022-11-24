// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { genesisBraverStand } from "../mesh/stand";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import type { GenesisBraverView } from "./genesis-braver-view";

/** プレイヤー ジェネシスブレイバービュー */
export class PlayerGenesisBraverView implements GenesisBraverView {
  /** 立ち */
  #stand: ArmdozerAnimation;
  /** グループ */
  #group: typeof THREE.Group;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();

    this.#stand = genesisBraverStand(resources);
    this.#group.add(this.#stand.getObject3D());
  }

  /** @override */
  destructor() {
    this.#stand.destructor();
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  engage(model: GenesisBraverModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }
}
