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

const EMPTY_MOUSE_RAYCASTER = {
  raycaster: new THREE.Raycaster()
};

const EMPTY_TOUCH_RAYCASTER_CONTAINER = {
  changedTouches: [],
  targetTouches: [],
  touches: [],
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

  const mouseDownRaycaster: Observable<MouseDownRaycaster> = origin.pipe(
    filter(v => v.type === 'mouseDown'),
    map(v => {
      if (v.type === 'mouseDown') {
        return toMouseDownRaycaster(v, renderer, camera);
      } else {
        return {
          type: 'mouseDownRaycaster',
          mouse: EMPTY_MOUSE_RAYCASTER
        }
      }
    })
  );

  const mouseMoveRayvaster: Observable<MouseMoveRaycaster> = origin.pipe(
    filter(v => v.type === 'mouseMove'),
    map(v => {
      if (v.type === 'mouseMove') {
        return toMouseMoveRaycaster(v, renderer, camera);
      } else {
        return {
          type: 'mouseMoveRaycaster',
          isLeftButtonClicked: false,
          mouse: EMPTY_MOUSE_RAYCASTER
        }
      }
    })
  );

  const touchStartRaycaster: Observable<TouchStartRaycaster> = origin.pipe(
    filter(v => v.type === 'touchStart'),
    map(v => {
      if (v.type === 'touchStart') {
        return toTouchStartRaycaster(v, renderer, camera);
      } else {
        return {
          type: 'touchStartRaycaster',
          touch: EMPTY_TOUCH_RAYCASTER_CONTAINER
        }
      }
    })
  );

  const touchMoveRaycaster: Observable<TouchMoveRaycaster> = origin.pipe(
    filter(v => v.type === 'touchMove'),
    map(v => {
      if (v.type === 'touchMove') {
        return toTouchMoveRaycaster(v, renderer, camera);
      } else {
        return {
          type: 'touchMoveRaycaster',
          touch: EMPTY_TOUCH_RAYCASTER_CONTAINER
        }
      }
    })
  );

  return merge(
    mouseDownRaycaster,
    mouseMoveRayvaster,
    touchStartRaycaster,
    touchMoveRaycaster,
  );
}
