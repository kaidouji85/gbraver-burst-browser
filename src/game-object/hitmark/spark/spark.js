// @flow
import * as THREE from 'three';
import type {SparkModel} from "./model/spark-model";
import type {SparkView} from "./view/spark-view";
import {createInitialValue} from "./model/initial-value";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";

/** 火花ヒットマーク */
export class Spark {
  _model: SparkModel;
  _view: SparkView;

  constructor(view: SparkView, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      }
    })
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  _update(action: Update): void {
    this._view.engage(this._model);
  }
}