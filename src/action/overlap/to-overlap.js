// @flow

import * as THREE from "three";
import {Observable, merge} from "rxjs";
import {filter, map} from 'rxjs/operators';
import type {DOMEvent} from "../dom-event/index";
import {
  toMouseDownRaycaster,
  toMouseMoveRaycaster,
  toTouchMoveRaycaster,
  toTouchStartRaycaster
} from "./dom-event-to-overlap";
import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import type {OverlapAction} from "./index";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";


const DUMMY_ACTION = {
  type: 'mouseDownRaycaster',
  mouse: {
    raycaster: new THREE.Raycaster()
  }
};

/**
 * DOMイベントストリームを当たり判定ストリームに変換する
 *
 * @param origin 変換元
 * @param renderer レンダラ
 * @param camera カメラ
 * @return 当たり判定ストリーム
 */
export function toOverlapObservable(origin: Observable<DOMEvent>, renderer: THREE.WebGLRenderer, camera: THREE.Camera): Observable<OverlapAction> {
  return origin.pipe(
    map(v => {
      switch (v.type) {
        case 'mouseDown':
          return {isValid: true, action: toMouseDownRaycaster(v, renderer, camera)};
        case 'mouseMove':
          return {isValid: true, action: toMouseMoveRaycaster(v, renderer, camera)};
        case 'touchStart':
          return {isValid: true, action: toTouchStartRaycaster(v, renderer, camera)};
        case 'touchMove':
          return {isValid: true, action: toTouchMoveRaycaster(v, renderer, camera)};
        default:
          return {isValid: false, action: DUMMY_ACTION}
      }
    }),
    filter(v => v.isValid),
    map(v => v.action)
  );
}
