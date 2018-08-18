// @flow

import * as THREE from 'three';
import type {GaugeView} from "./view/gauge-view";
import type {GaugeModel} from "./model/gauge-model";

type Param = {
  view: GaugeView,
  hp: number,
  battery: number
};

/** ゲージ */
export class Gauge {
  _model: GaugeModel;
  _view: GaugeView;

  constructor(param: Param) {
    this._view = param.view;
    this._model = {
      hp: param.hp,
      maxHp: param.hp,
      battery: param.battery,
      maxBattery: param.battery
    };
  }

  gameLoop(time: DOMHighResTimeStamp): void {
    this._view.engage(this._model);
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}
