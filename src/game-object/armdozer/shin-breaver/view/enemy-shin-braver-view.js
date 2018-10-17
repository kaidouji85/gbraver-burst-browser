// @flow

import {PlayerShinBraverView} from "./player-shin-braver-view";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";

/**
 *  敵側シンブレイバー
 *  プレイヤー版のものを左右反転させただけである
 */
export class EnemyShinBraverView extends PlayerShinBraverView {
  constructor(resources: Resources) {
    super(resources);
  }

  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel): void {
    super.engage(model);
    this._mesh.position.x *= -1;
    this._mesh.scale.x = -1;
  }
}