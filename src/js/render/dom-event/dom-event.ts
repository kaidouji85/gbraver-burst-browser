import { merge, Observable } from "rxjs";

import type { MouseDown, MouseMove, MouseUp } from "./mouse";
import {
  createMouseDownStream,
  createMouseMoveStream,
  createMouseUpStream,
} from "./mouse";
import type { TouchEnd, TouchMove, TouchStart } from "./touch";
import {
  createTouchEndStream,
  createTouchMoveStream,
  createTouchStartStream,
} from "./touch";

/** three.js Renderer要素のイベントをまとめたもの */
export type RendererDOMEvent =
  | MouseDown
  | MouseMove
  | MouseUp
  | TouchStart
  | TouchMove
  | TouchEnd;

/**
 * three.js Renderer要素のイベントストリームを生成する
 *
 * @param renderDom three.jsを描画するHTML要素
 * @returns ストリーム
 */
export function createDOMEventStream(
  renderDom: HTMLElement,
): Observable<RendererDOMEvent> {
  return merge(
    createMouseDownStream(renderDom),
    createMouseMoveStream(renderDom),
    createMouseUpStream(renderDom),
    createTouchStartStream(renderDom),
    createTouchMoveStream(renderDom),
    createTouchEndStream(renderDom),
  );
}
