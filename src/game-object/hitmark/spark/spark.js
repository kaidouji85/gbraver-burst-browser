// @flow
import * as THREE from 'three';
import type {SparkModel} from "./model/spark-model";
import type {SparkView} from "./view/spark-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {Update} from "../../../action/game-loop/update";
import {Animate} from "../../../animation/animate";
import {popUp} from "./animation/pop-up";
import type {PreRender} from "../../../action/game-loop/pre-render";

/** 火花ヒットマーク */
export class Spark {
  _model: SparkModel;
  _view: SparkView;
  _subscription: Subscription;

  constructor(view: SparkView, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;

    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    })
  }

  /** デストラクタ */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /** ヒットマークを表示する */
  popUp(): Animate {
    return popUp(this._model);
  }

  /** シーンに追加するObject3Dを追加する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** アップデート */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}
