import { filter, map, Observable, share } from "rxjs";
import * as THREE from "three";

import type { RendererDOMEvent } from "../dom-event/dom-event";
import type { MouseDownRaycaster } from "./mouse-down-raycaster";
import { toMouseDownRaycaster } from "./mouse-down-raycaster";
import type { MouseMoveRaycaster } from "./mouse-move-raycaster";
import { toMouseMoveRaycaster } from "./mouse-move-raycaster";
import type { MouseUpRaycaster } from "./mouse-up-raycaster";
import { toMouseUpRaycaster } from "./mouse-up-raycaster";
import type { TouchEndRaycaster } from "./touch-end-raycaster";
import { toTouchEndRaycaster } from "./touch-end-raycaster";
import type { TouchMoveRaycaster } from "./touch-move-raycaster";
import { toTouchMoveRaycaster } from "./touch-move-raycaster";
import type { TouchStartRaycaster } from "./touch-start-raycaster";
import { toTouchStartRaycaster } from "./touch-start-raycaster";

/**
 * オーバーラップ イベント
 */
export type OverlapEvent =
  | MouseDownRaycaster
  | MouseMoveRaycaster
  | MouseUpRaycaster
  | TouchStartRaycaster
  | TouchMoveRaycaster
  | TouchEndRaycaster;

/**
 * DOMイベントストリームを当たり判定ストリームに変換する
 *
 * @param origin 変換元
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @returns 当たり判定ストリーム
 */
export function toOverlapStream(
  origin: Observable<RendererDOMEvent>,
  rendererDOM: HTMLElement,
  camera: THREE.Camera,
): Observable<OverlapEvent> {
  return origin.pipe(
    map((v) => {
      switch (v.type) {
        case "mouseDown":
          return toMouseDownRaycaster(v, rendererDOM, camera);

        case "mouseMove":
          return toMouseMoveRaycaster(v, rendererDOM, camera);

        case "mouseUp":
          return toMouseUpRaycaster(v, rendererDOM, camera);

        case "touchStart":
          return toTouchStartRaycaster(v, rendererDOM, camera);

        case "touchMove":
          return toTouchMoveRaycaster(v, rendererDOM, camera);

        case "touchEnd":
          return toTouchEndRaycaster(v, rendererDOM, camera);

        default:
          return null;
      }
    }),
    filter((v) => !!v),
    map((v) => v as OverlapEvent),
    share(),
  );
}
