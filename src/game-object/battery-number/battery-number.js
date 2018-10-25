// @flow

import type {BatteryNumberModel} from "./model/battery-number-model";
import type {BatteryNumberView} from "./view/battery-number-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import * as THREE from 'three';
import type {MultiTween} from "../../tween/multi-tween/multi-tween";
import {createInitialValue} from "./model/initial-value";
import {popUp} from "./animation/pop-up";
import {Group} from '@tweenjs/tween.js';
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";

type Param = {
  listener: Observable<GameObjectAction>,
  view: BatteryNumberView
};

/** バッテリー数字 */
export class BatteryNumber {
  _model: BatteryNumberModel;
  _view: BatteryNumberView;
  _tween: Group;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = param.view;
    this._tween = new Group();
    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** バッテリーを表示する */
  popUp(battery: number): MultiTween {
    return popUp(this._model, this._tween, battery);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}