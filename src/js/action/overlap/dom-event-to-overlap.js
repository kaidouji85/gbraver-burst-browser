// @flow

import * as THREE from "three";
import type {MouseRaycaster} from "../../raycaster/mouse/mouse-raycaster";
import {createMouseRaycaster} from "../../raycaster/mouse/mouse-raycaster";
import type {TouchStart} from "../dom-event/touch-start";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import {createTouchEventRaycaster} from "../../raycaster/touch/touch-raycaster";
import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import {isMouseLeftButtonPushed} from "../../mouse/mouse-left-button";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";
import type {TouchMove} from "../dom-event/touch-move";
import {Observable} from "rxjs";
import type {DOMEvent} from "../dom-event";
import type {OverlapAction} from "./index";
import {filter, map} from "rxjs/operators";
import type {MouseDown, MouseMove} from "../dom-event/mouse";

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
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @return 当たり判定ストリーム
 */
export function toOverlapObservable(origin: Observable<DOMEvent>, rendererDOM: HTMLElement, camera: THREE.Camera): Observable<OverlapAction> {
  return origin.pipe(
    map(v => {
      switch (v.type) {
        case 'mouseDown':
          return toMouseDownRaycaster(v, rendererDOM, camera);
        case 'mouseMove':
          return toMouseMoveRaycaster(v, rendererDOM, camera);
        case 'touchStart':
          return toTouchStartRaycaster(v, rendererDOM, camera);
        case 'touchMove':
          return toTouchMoveRaycaster(v, rendererDOM, camera);
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