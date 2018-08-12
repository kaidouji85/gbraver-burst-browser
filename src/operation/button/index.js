// @flow

import * as THREE from 'three';
import {ButtonOverlap, createOverlapMesh} from "./button-overlap";
import type {OverlapAction} from "../../action/overlap";
import type {OverlapListener} from "../../observer/overlap/overlap-listener";
import type {MouseDownRaycaster} from "../../action/overlap/mouse-down-raycaster";
import {isMouseOverlap} from "../../overlap/check/mouse/mouse-overlap";
import type {TouchStartRaycaster} from "../../action/overlap/touch-start-raycaster";
import {isTouchOverlap} from "../../overlap/check/touch/touch-overlap";

type Param = {
  width: number,
  height: number,
  listener: OverlapListener,
  onButtonPush: () => void
};

/** ボタンの当たり判定 */
export class ButtonOperation {
  _listener: OverlapListener;
  _overlap: ButtonOverlap;
  _onButtonPush: () => void;

  constructor(param: Param) {
    this._overlap = new ButtonOverlap({
      width: 100,
      height: 100
    });

    this._listener = param.listener;
    this._listener.add(action => this._overlapAction(action));

    this._onButtonPush = param.onButtonPush;
  }

  getObject3D(): THREE.Object3D {
    return this._overlap.getObject3D();
  }

  _overlapAction(action: OverlapAction): void {
    switch (action.type) {
      case 'mouseDownRaycaster':
        this._mouseDown(action);
        return;
      case 'touchStartRaycaster':
        this._touchStartRaycaster(action);
        return;
      default:
        return;
    }
  }

  _mouseDown(action: MouseDownRaycaster): void {
    if(isMouseOverlap(action.mouse, this._overlap)) {
      this._onButtonPush();
    }
  }

  _touchStartRaycaster(action: TouchStartRaycaster): void {
    if(isTouchOverlap(action.touch, this._overlap)) {
      this._onButtonPush();
    }
  }

}