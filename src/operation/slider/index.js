// @flow

import {TouchLocation} from "./touch-location/touch-location";
import {Observable, Subject} from "rxjs";
import {distinctUntilChanged, filter, map} from "rxjs/operators";
import * as THREE from 'three';
import type {MouseDownRaycaster} from "../../action/overlap/mouse-down-raycaster";
import type {MouseMoveRaycaster} from "../../action/overlap/mouse-move-raycaster";
import type {TouchStartRaycaster} from "../../action/overlap/touch-start-raycaster";
import type {TouchMoveRaycaster} from "../../action/overlap/touch-move-raycaster";
import type {GameObjectAction} from "../../action/game-object-action";
import type {SliderOperationModel} from "./model/slider-operation-model";
import {INITIAL_VALUE} from "./model/initial-value";
import {onOverlap} from "./model/on-overlap";

/** コンストラクタのパラメータ */
type Param = {
  values: number[],
  width: number,
  height: number,
  onValueChange: (value: number) => void,
  listener: Observable<GameObjectAction>
};

/** スライダーの当たり判定 */
export class SliderOperation {
  _model: SliderOperationModel;
  _touchLocation: TouchLocation;
  _onValueChange: (value: number) => void;

  constructor(param: Param) {
    this._model = INITIAL_VALUE;
    this._onValueChange = param.onValueChange;
    this._touchLocation = new TouchLocation({
      values: param.values,
      width: param.width,
      height: param.height
    });

    param.listener.subscribe(action => {
      switch (action.type) {
        case 'mouseDownRaycaster':
          this._mouseDownRaycaster(action);
          return;
        case 'mouseMoveRaycaster':
          this._mouseMoveRaycaster(action);
          return;
        case 'touchStartRaycaster':
          this._touchStartRaycaster(action);
          return;
        case 'touchMoveRaycaster':
          this._touchMoveRaycaster(action);
          return;
        default:
          return;
      }
    });

  }

  getObject3D(): THREE.Object3D {
    return this._touchLocation.getObject3D();
  }

  _mouseDownRaycaster(action: MouseDownRaycaster): void {
    const overlap = this._touchLocation.getMouseOverlap(action.mouse);
    const result = onOverlap(this._model, overlap);
    this._model = result.update;
    if (result.isValueChanged) {
      this._onValueChange(result.value);
    }
  }

  _mouseMoveRaycaster(action: MouseMoveRaycaster): void {
    if (!action.isLeftButtonClicked) {
      return;
    }

    const overlap = this._touchLocation.getMouseOverlap(action.mouse);
    const result = onOverlap(this._model, overlap);
    this._model = result.update;
    if (result.isValueChanged) {
      this._onValueChange(result.value);
    }
  }

  _touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlap = this._touchLocation.getTouchOverlap(action.touch);
    const result = onOverlap(this._model, overlap);
    this._model = result.update;
    if (result.isValueChanged) {
      this._onValueChange(result.value);
    }
  }

  _touchMoveRaycaster(action: TouchMoveRaycaster): void {
    const overlap = this._touchLocation.getTouchOverlap(action.touch);
    const result = onOverlap(this._model, overlap);
    this._model = result.update;
    if (result.isValueChanged) {
      this._onValueChange(result.value);
    }
  }
}