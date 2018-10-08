// @flow

import {PlayerNeoLandozerView} from "./player-neo-landozer-view";
import type {Resources} from "../../../../resource/index";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import * as THREE from "three";

/**
 *  敵側ネオランドーザ
 *  プレイヤー版のものを左右反転させただけである
 */
export class EnemyNeoLandozerView extends PlayerNeoLandozerView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: NeoLandozerModel, camera: THREE.Camera): void {
    super.engage(model, camera);
    this._mesh.position.x *= -1;
    this._mesh.scale.x = -1;
  }
}