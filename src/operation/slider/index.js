// @flow

import {TouchLocation} from "./touch-location";
import {Subject} from "rxjs";
import {distinctUntilChanged, filter, map} from "rxjs/operators";
import * as THREE from 'three';
import type {RaycasterListener} from "../../observer/raycaster/raycaster-listener";
import type {RaycasterAction} from "../../observer/raycaster/action";
import type {MouseDownRaycaster} from "../../observer/raycaster/action/mouse-down-raycaster";
import type {MouseMoveRaycaster} from "../../observer/raycaster/action/mouse-move-raycaster";
import type {TouchStartRaycaster} from "../../observer/raycaster/action/touch-start-raycaster";
import type {TouchMoveRaycaster} from "../../observer/raycaster/action/touch-move-raycaster";

/** コンストラクタのパラメータ */
type Param = {
  values: number[],
  width: number,
  height: number,
  onValueChange: (value: number) => void,
  raycasterListener: RaycasterListener
};

/** スライダーの当たり判定 */
export class SliderOperation {
  _touchLocation: TouchLocation;
  _onOverlap: Subject<number[]>;
  _raycasterListener: RaycasterListener;

  constructor(param: Param) {
    this._touchLocation = new TouchLocation({
      values: param.values,
      width: param.width,
      height: param.height
    });

    this._raycasterListener = param.raycasterListener;
    this._raycasterListener.add(action => {
      this._raycasterActionHandler(action);
    });

    this._onOverlap = new Subject();
    this._onOverlap.pipe(
      filter(v => 0 < v.length),
      map(v => v.reduce((a, b) => Math.max(a, b))),
      distinctUntilChanged()
    ).subscribe(v => {
      param.onValueChange(v);
    });
  }

  /** レイキャスターアクションのハンドラ */
  _raycasterActionHandler(action: RaycasterAction): void {
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
  }

  _mouseDownRaycaster(action: MouseDownRaycaster): void {
    const overlap = this._touchLocation.getMouseOverlap(action.mouse);
    this._onOverlap.next(overlap);
  }

  _mouseMoveRaycaster(action: MouseMoveRaycaster): void {
    if (!action.isLeftButtonClicked) {
      return;
    }

    const overlap = this._touchLocation.getMouseOverlap(action.mouse);
    this._onOverlap.next(overlap);
  }

  _touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlap = this._touchLocation.getTouchOverlap(action.touch);
    this._onOverlap.next(overlap);
  }

  _touchMoveRaycaster(action: TouchMoveRaycaster): void {
    const overlap = this._touchLocation.getTouchOverlap(action.touch);
    this._onOverlap.next(overlap);
  }

  getObject3D(): THREE.Object3D {
    return this._touchLocation.getObject3D();
  }
}