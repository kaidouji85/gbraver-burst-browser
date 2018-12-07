// @flow

import * as THREE from 'three';
import type {RecoverBatteryModel} from "./model/recover-battery-model";
import type {RecoverBatteryView} from "./view/recover-battery-view";
import {createInitialValue} from "./model/initial-value";
import type {GameObjectAction} from "../../action/game-object-action";
import {Observable} from "rxjs";
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";

type Param = {
  view: RecoverBatteryView,
  listener: Observable<GameObjectAction>
};

export class RecoverBattery {
  _model: RecoverBatteryModel;
  _view: RecoverBatteryView;

  constructor(param: Param): void {
    this._model = createInitialValue();
    this._view = param.view;
    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    })
  }

  getObject3D(): THREE.OBject3D {
    return this._view.getObject3D();
  }

  _update(action: Update): void {
    this._view.engage(this._model);
  }

  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera)
  }
}