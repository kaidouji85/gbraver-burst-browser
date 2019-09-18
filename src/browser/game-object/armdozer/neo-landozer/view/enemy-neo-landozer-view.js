// @flow

import {PlayerNeoLandozerView} from "./player-neo-landozer-view";
import type {Resources} from "../../../../resource";
import type {NeoLandozerModel} from "../model/neo-landozer-model";

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
    this._group.position.x *= -1;
    this._group.scale.x = -1;
  }
}