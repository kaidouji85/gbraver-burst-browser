// @flow

import * as THREE from "three";
import {Observable, merge} from "rxjs";
import {filter, map} from 'rxjs/operators';
import type {DOMEvent} from "../action/dom-event";
import {toMouseDownRaycaster, toTouchStartRaycaster} from "../action/overlap/dom-event-to-overlap";
import type {MouseDownRaycaster} from "../action/overlap/mouse-down-raycaster";
import type {OverlapAction} from "../action/overlap";
import type {TouchStartRaycaster} from "../action/overlap/touch-start-raycaster";

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

  return merge(
    mouseDownRaycaster,
    touchStartRaycaster
  );
}
