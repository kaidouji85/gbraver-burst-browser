// @flow

import {MESH_HEIGHT, PlayerShinBraverView} from "./player-shin-braver";
import type {Resources} from "../../../../resource/resource-manager";
import type {ShinBraverModel} from "../base";
import * as THREE from "three";

/**
 *  敵側シンブレイバー
 *  プレイヤー版のものを左右反転させただけである
 */
export class EnemyShinBraverView extends PlayerShinBraverView {
  constructor(resources: Resources) {
    super(resources);
  }

  gameLoop(model: ShinBraverModel, camera: THREE.Camera): void {
    this._mesh.position.set(
      -model.position.x,
      model.position.y + MESH_HEIGHT / 2 - 30,
      model.position.z
    );
    this._mesh.scale.x = -1;
    // TODO アニメフレームを設定する
    this._texture.offset.x = 0;
    this._mesh.quaternion.copy(camera.quaternion);
  }
}