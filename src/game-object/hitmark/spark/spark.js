import * as THREE from 'three';
import type {SparkModel} from "./model/spark-model";
import type {SparkView} from "./view/spark-view";
import {createInitialState} from "../../../scene/battle/state/initial-state";

export class Spark {
  _model: SparkModel;
  _view: SparkView;

  constructor(view: SparkView) {
    this._model = createInitialState();
    this._view = view;
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}