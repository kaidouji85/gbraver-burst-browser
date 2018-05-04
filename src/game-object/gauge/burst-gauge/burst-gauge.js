// @flow

import {BurstGaugeView} from "./view/burst-gauge-view";
import type {BurstGaugeModel} from "./model/burst-gauge-model";
import * as THREE from "three";

export type Param = {
  view: BurstGaugeView,
  isActive: boolean
};

export class BurstGauge {
  _view: BurstGaugeView;
  _model: BurstGaugeModel;

  constructor(param: Param) {
    this._model = {
      isActive: param.isActive
    };
    this._view = param.view;
  }

  gameLoop(): void {
    this._view.gameLoop(this._model);
  }

  setActive(isActive: boolean) {
    this._model.isActive = isActive;
  }

  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}