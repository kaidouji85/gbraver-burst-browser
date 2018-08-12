// @flow

import {TouchLocation} from "./touch-location";
import {Subject} from "rxjs";
import {distinctUntilChanged, filter, map} from "rxjs/operators";
import * as THREE from 'three';
import type {OverlapListener} from "../../observer/overlap/overlap-listener";
import type {OverlapAction} from "../../action/overlap/index";
import type {MouseDownRaycaster} from "../../action/overlap/mouse-down-raycaster";
import type {MouseMoveRaycaster} from "../../action/overlap/mouse-move-raycaster";
import type {TouchStartRaycaster} from "../../action/overlap/touch-start-raycaster";
import type {TouchMoveRaycaster} from "../../action/overlap/touch-move-raycaster";

/** コンストラクタのパラメータ */
type Param = {
  values: number[],
  width: number,
  height: number,
  onValueChange: (value: number) => void,
  overlapListener: OverlapListener
};

/** スライダーの当たり判定 */
export class SliderOperation {
  _touchLocation: TouchLocation;
  _onOverlap: Subject<number[]>;
  _raycasterListener: OverlapListener;

  constructor(param: Param) {
    this._touchLocation = new TouchLocation({
      values: param.values,
      width: param.width,
      height: param.height
    });

    this._raycasterListener = param.overlapListener;
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
  _raycasterActionHandler(action: OverlapAction): void {
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