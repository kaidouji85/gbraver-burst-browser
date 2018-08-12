// @flow

import * as THREE from 'three';
import {ButtonOverlap, createOverlapMesh} from "./button-overlap";
import type {OverlapAction} from "../../action/overlap";
import type {OverlapListener} from "../../observer/overlap/overlap-listener";
import type {MouseDownRaycaster} from "../../action/overlap/mouse-down-raycaster";

type Param = {
  width: number,
  height: number,
  listener: OverlapListener
};

/** ボタンの当たり判定 */
export class ButtonOperation {
  _listener: OverlapListener;
  _overlap: ButtonOverlap;

  constructor(param: Param) {
    this._overlap = new ButtonOverlap({
      width: 100,
      height: 100
    });
    this._listener = param.listener;
    this._listener.add(action => this._overlapAction(action));
  }

  getObject3D(): THREE.Object3D {
    return this._overlap.getObject3D();
  }

  _overlapAction(action: OverlapAction): void {
    switch (action) {
      case 'mouseDownRaycaster':
        return;
      default:
        return;
    }
  }

  _mouseDown(action: MouseDownRaycaster): void {

  }
}