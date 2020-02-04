// @flow

import * as THREE from "three";
import {toTouchStartRaycaster} from "./touch-start-raycaster";
import {toMouseDownRaycaster} from "./mouse-down-raycaster";
import {toMouseMoveRaycaster} from "./mouse-move-raycaster";
import {toTouchMoveRaycaster} from "./touch-move-raycaster";
import {Observable} from "rxjs";
import type {TdDOMEvent} from "../td-dom";
import type {OverlapAction} from "./index";
import {filter, map, share} from "rxjs/operators";

/**
 * DOMイベントストリームを当たり判定ストリームに変換する
 *
 * @param origin 変換元
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @return 当たり判定ストリーム
 */
export function toOverlapStream(origin: Observable<TdDOMEvent>, rendererDOM: HTMLElement, camera: THREE.Camera): Observable<OverlapAction> {
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
    map(v => (v: OverlapAction)),
    share()
  );
}