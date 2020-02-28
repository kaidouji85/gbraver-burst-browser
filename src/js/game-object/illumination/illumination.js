// @flow

import * as THREE from "three";
import type {IlluminationModel} from "./model/illumination-model";
import {IlluminationView} from "./view/illumination-view";
import {createInitialValue} from "./model/initial-value";

/**
 * ステージ全体の照明
 */
export class Illumination {
  _model: IlluminationModel;
  _view: IlluminationView;

  constructor() {
    this._model = createInitialValue();

    this._view = new IlluminationView();
    this._view.engage(this._model);
  }

  /**
   * シーンに追加するオブジェクトを配列で返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return this._view.getObject3Ds();
  }
}