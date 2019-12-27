// @flow

import * as THREE from "three";
import {toTouchStartRaycaster} from "./touch-start-raycaster";
import {toMouseDownRaycaster} from "./mouse-down-raycaster";
import {toMouseMoveRaycaster} from "./mouse-move-raycaster";
import {toTouchMoveRaycaster} from "./touch-move-raycaster";
import {Observable} from "rxjs";
import type {DOMEvent} from "../dom-event";
import type {OverlapAction} from "./index";
import {filter, map, share} from "rxjs/operators";

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
export function toOverlapStream(origin: Observable<DOMEvent>, rendererDOM: HTMLElement, camera: THREE.Camera): Observable<OverlapAction> {
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
    map(v => v ? v : DUMMY_ACTION),
    share()
  );
}