// @flow

import type {MouseDown, MouseMove, MouseUp} from "./mouse";
import {createMouseDownStream, createMouseMoveStream, createMouseUpStream} from "./mouse";
import type {TouchEnd, TouchMove, TouchStart} from "./touch";
import {createTouchEndStream, createTouchMoveStream, createTouchStartStream} from "./touch";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators";

/** three.js Renderer要素のイベントをまとめたもの */
export type TdDOMEvent =
  MouseDown |
  MouseMove |
  MouseUp |
  TouchStart |
  TouchMove |
  TouchEnd;

/**
 * three.js Renderer要素のイベントストリームを生成する
 *
 * @param renderDom three.jsを描画するHTML要素
 * @return ストリーム
 */
export function createDOMEventStream(renderDom: HTMLElement): Observable<TdDOMEvent> {
  const mouseDown = createMouseDownStream(renderDom).pipe(
    map(v => (v: TdDOMEvent))
  );
  const mouseMove = createMouseMoveStream(renderDom).pipe(
    map(v => (v: TdDOMEvent))
  );
  const mouseUp = createMouseUpStream(renderDom).pipe(
    map(v => (v: TdDOMEvent))
  );

  const touchStart = createTouchStartStream(renderDom).pipe(
    map(v => (v: TdDOMEvent))
  );
  const touchMove = createTouchMoveStream(renderDom).pipe(
    map(v => (v: TdDOMEvent))
  );
  const touchEnd = createTouchEndStream(renderDom).pipe(
    map(v => (v: TdDOMEvent))
  );

  return merge(
    mouseDown,
    mouseMove,
    mouseUp,
    touchStart,
    touchMove,
    touchEnd,
  );
}