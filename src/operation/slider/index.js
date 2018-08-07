// @flow

import {TouchLocation} from "./touch-location";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {TouchRaycastContainer} from "../../overlap/check/touch/touch-raycaster";
import {Subject} from "rxjs";
import {distinctUntilChanged, filter, map} from "rxjs/operators";
import * as THREE from 'three';

/** コンストラクタのパラメータ */
type Param = {
  start: number,
  end: number,
  width: number,
  height: number,
  onValueChange: (value: number) => void
};

/** スライダーの当たり判定 */
export class SliderOperation {
  _touchLocation: TouchLocation;
  _onOverlap: Subject<number[]>;

  constructor(param: Param) {
    this._touchLocation = new TouchLocation(param);
    this._onOverlap = new Subject();
    this._onOverlap.pipe(
      filter(v => 0 < v.length),
      map(v => v.reduce((a, b) => Math.max(a, b))),
      distinctUntilChanged()
    ).subscribe(v => {
      param.onValueChange(v);
    });
  }

  /** マウスダウンした際の処理 */
  onMouseDown(mouse: MouseRaycaster): void {
    const overlap = this._touchLocation.getMouseOverlap(mouse);
    this._onOverlap.next(overlap);
  }

  /** マウスムーブした際の処理 */
  onMouseMove(mouse: MouseRaycaster, isLeftButtonPushed: boolean): void {
    if (!isLeftButtonPushed) {
      return;
    }

    const overlap = this._touchLocation.getMouseOverlap(mouse);
    this._onOverlap.next(overlap);
  }

  /** タッチスタートした際の処理 */
  onTouchStart(touch: TouchRaycastContainer): void {
    const overlap = this._touchLocation.getTouchOverlap(touch);
    this._onOverlap.next(overlap);
  }

  /** タッチムーブした際の処理 */
  onTouchMove(touch: TouchRaycastContainer): void {
    const overlap = this._touchLocation.getTouchOverlap(touch);
    this._onOverlap.next(overlap);
  }

  getObject3D(): THREE.Object3D {
    return this._touchLocation.getObject3D();
  }
}