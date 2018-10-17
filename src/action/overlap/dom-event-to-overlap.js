// @flow

import * as THREE from "three";
import type {MouseDown} from "../dom-event/mouse-down";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import type {TouchStart} from "../dom-event/touch-start";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import {createTouchEventRaycaster} from "../../overlap/check/touch/touch-raycaster";
import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import type {MouseMove} from "../dom-event/mouse-move";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import {isMouseLeftButtonPushed} from "../../mouse/mouse-left-button";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";
import type {TouchMove} from "../dom-event/touch-move";
import {Observable} from "rxjs";
import type {DOMEvent} from "../dom-event";
import type {OverlapAction} from "./index";
import {filter, map} from "rxjs/operators";

/** MouseDownからMouseDownRaycasterに変換 */
export function toMouseDownRaycaster(origin: MouseDown, renderer: THREE.WebGLRenderer, camera: THREE.Camera): MouseDownRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(origin.event, renderer, camera);
  return {
    type: 'mouseDownRaycaster',
    mouse: mouseRaycaster
  };
}

/** MouseMoveからMouseMoveRaycasterに変換 */
export function toMouseMoveRaycaster(origin: MouseMove, renderer: THREE.WebGLRenderer, camera: THREE.Camera): MouseMoveRaycaster {
  const mouseRaycaster: MouseRaycaster = createMouseRaycaster(origin.event, renderer, camera);
  const isLeftButtonClicked = isMouseLeftButtonPushed(origin.event);

  return {
    type: 'mouseMoveRaycaster',
    mouse: mouseRaycaster,
    isLeftButtonClicked: isLeftButtonClicked
  };
}

/** TouchStartからTouchStartRaycasterに変換する */
export function toTouchStartRaycaster(origin: TouchStart, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchStartRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchStartRaycaster',
    touch: touch
  };
}

/** TouchMoveからTouchMoveRaycasterに変換する */
export function toTouchMoveRaycaster(origin: TouchMove, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchMoveRaycaster {
  const touch = createTouchEventRaycaster(origin.event, renderer, camera);
  return {
    type: 'touchMoveRaycaster',
    touch: touch
  };
}

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
 * @param activeCamera 現在有効なカメラを取得するためのコールバック関数
 * @return 当たり判定ストリーム
 */
export function toOverlapObservable(origin: Observable<DOMEvent>, renderer: THREE.WebGLRenderer, activeCamera: () => THREE.Camera): Observable<OverlapAction> {
  return origin.pipe(
    map(v => {
      switch (v.type) {
        case 'mouseDown':
          return toMouseDownRaycaster(v, renderer, activeCamera());
        case 'mouseMove':
          return toMouseMoveRaycaster(v, renderer, activeCamera());
        case 'touchStart':
          return toTouchStartRaycaster(v, renderer, activeCamera());
        case 'touchMove':
          return toTouchMoveRaycaster(v, renderer, activeCamera());
        default:
          return null;
      }
    }),
    filter(v => !!v),
    // ストリームのデータ型をObservable<OverlapAction>にするために、この処理を行う
    // 前の処理でnullはフィルタしているので、DUMMY_ACTIONが使われることはない
    map(v => v ? v : DUMMY_ACTION)
  );
}