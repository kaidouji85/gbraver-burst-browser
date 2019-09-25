// @flow

import type {BatteryNumberModel} from "./model/battery-number-model";
import type {BatteryNumberView} from "./view/battery-number-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import * as THREE from 'three';
import {createInitialValue} from "./model/initial-value";
import {popUp} from "./animation/pop-up";
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";
import {Animate} from "../../animation/animate";

type Param = {
  listener: Observable<GameObjectAction>,
  view: BatteryNumberView
};

/** バッテリー数字 */
export class BatteryNumber {
  _model: BatteryNumberModel;
  _view: BatteryNumberView;
  _subscription: Subscription;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = param.view;
    this._subscription = param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /** バッテリーを表示する */
  popUp(battery: number): Animate {
    return popUp(this._model, battery);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}