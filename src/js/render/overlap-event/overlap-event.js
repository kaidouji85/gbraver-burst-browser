// @flow

import type {MouseDownRaycaster} from "./mouse-down-raycaster";
import {toMouseDownRaycaster} from "./mouse-down-raycaster";
import type {MouseMoveRaycaster} from "./mouse-move-raycaster";
import {toMouseMoveRaycaster} from "./mouse-move-raycaster";
import type {TouchStartRaycaster} from "./touch-start-raycaster";
import {toTouchStartRaycaster} from "./touch-start-raycaster";
import type {TouchMoveRaycaster} from "./touch-move-raycaster";
import {toTouchMoveRaycaster} from "./touch-move-raycaster";
import {Observable} from "rxjs";
import type {RendererDOMEvent} from "../dom-event/dom-event";
import * as THREE from "three";
import {filter, map, share} from "rxjs/operators";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

/**
 * オーバーラップ イベント
 */
export type OverlapEvent =
  MouseDownRaycaster |
  MouseMoveRaycaster |
  TouchStartRaycaster |
  TouchMoveRaycaster;

/**
 * @deprecated
 * DOMイベントストリームを当たり判定ストリームに変換する
 *
 * @param origin 変換元
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @return 当たり判定ストリーム
 */
export function deprecated_toOverlapStream(origin: Observable<RendererDOMEvent>, rendererDOM: HTMLElement, camera: typeof THREE.Camera): Observable<OverlapEvent> {
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
    map(v => (v: OverlapEvent)),
    share()
  );
}

/**
 * DOMイベントストリームを当たり判定ストリームに変換する
 *
 * @param origin 変換元
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @return 当たり判定ストリーム
 */
export function toOverlapStream(origin: Stream<RendererDOMEvent>, rendererDOM: HTMLElement, camera: typeof THREE.Camera): Stream<OverlapEvent> {
  const observable = (origin.getRxjsObservable(): any).pipe(  // TODO rxjsのflow-typedを削除した後に、:anyを消す
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
    map(v => (v: OverlapEvent)),
    share()
  );
  return toStream(observable);
}