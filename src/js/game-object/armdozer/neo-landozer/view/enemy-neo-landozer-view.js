// @flow

import type {Resources} from "../../../../resource";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {PlayerNeoLandozerView} from "./player-neo-landozer-view";

/**
 *  敵側ネオランドーザ
 *  プレイヤー版のものを左右反転させただけである
 */
export class EnemyNeoLandozerView extends PlayerNeoLandozerView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: NeoLandozerModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
    this.getObject3D().scale.x = -1;
  }
}