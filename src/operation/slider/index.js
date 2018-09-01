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
import {overlapToValue} from "./overlap-to-value";

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
  lastValue: ?number;
  _touchLocation: TouchLocation;
  _onValueChange: (value: number) => void;

  constructor(param: Param) {
    this.lastValue = null;
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

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._touchLocation.getObject3D();
  }

  /** マウスダウンの処理 */
  _mouseDownRaycaster(action: MouseDownRaycaster): void {
    const overlap = this._touchLocation.getMouseOverlap(action.mouse);
    this._onOverlap(overlap);
  }

  /** マウスムーブの処理 */
  _mouseMoveRaycaster(action: MouseMoveRaycaster): void {
    if (!action.isLeftButtonClicked) {
      return;
    }

    const overlap = this._touchLocation.getMouseOverlap(action.mouse);
    this._onOverlap(overlap);
  }

  /** タッチスタートの処理 */
  _touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlap = this._touchLocation.getTouchOverlap(action.touch);
    this._onOverlap(overlap);
  }

  /** タッチムーブの処理 */
  _touchMoveRaycaster(action: TouchMoveRaycaster): void {
    const overlap = this._touchLocation.getTouchOverlap(action.touch);
    this._onOverlap(overlap);
  }

  /** 当たり判定 */
  _onOverlap(overlap: number[]): void {
    const value = overlapToValue(overlap);
    if (value === null || value === undefined) {
      return;
    }

    if (this.lastValue === value) {
      return;
    }

    this.lastValue = value;
    this._onValueChange(value);
  }
}