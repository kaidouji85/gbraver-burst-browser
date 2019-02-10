// @flow
import * as THREE from 'three';
import type {SparkModel} from "./model/spark-model";
import type {SparkView} from "./view/spark-view";
import {createInitialValue} from "./model/initial-value";

/** 火花ヒットマーク */
export class Spark {
  _model: SparkModel;
  _view: SparkView;

  constructor(view: SparkView) {
    this._model = createInitialValue();
    this._view = view;
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}