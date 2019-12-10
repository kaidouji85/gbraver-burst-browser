// @flow

import type {Resize} from "./resize";
import {createResizeStream} from "./resize";
import type {MouseDown, MouseMove, MouseUp} from "./mouse";
import {createMouseDownStream, createMouseMoveStream, createMouseUpStream} from "./mouse";
import type {TouchEnd, TouchMove, TouchStart} from "./touch";
import {createTouchEndStream, createTouchMoveStream, createTouchStartStream} from "./touch";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators";

/** DOMイベント */
export type DOMEvent =
  Resize |
  MouseDown |
  MouseMove |
  MouseUp |
  TouchStart |
  TouchMove |
  TouchEnd;

/**
 * DOMイベントストリーム
 *
 * @param renderDom three.jsを描画するHTML要素
 * @return ストリーム
 */
export function createDOMEventStream(renderDom: HTMLElement): Observable<DOMEvent> {
  const mouseDown = createMouseDownStream(renderDom).pipe(
    map(v => (v: DOMEvent))
  );
  const mouseMove = createMouseMoveStream(renderDom).pipe(
    map(v => (v: DOMEvent))
  );
  const mouseUp = createMouseUpStream(renderDom).pipe(
    map(v => (v: DOMEvent))
  );

  const touchStart = createTouchStartStream(renderDom).pipe(
    map(v => (v: DOMEvent))
  );
  const touchMove = createTouchMoveStream(renderDom).pipe(
    map(v => (v: DOMEvent))
  );
  const touchEnd = createTouchEndStream(renderDom).pipe(
    map(v => (v: DOMEvent))
  );

  const resize: Observable<DOMEvent> = createResizeStream().pipe(
    map(v => (v: DOMEvent))
  );

  return merge(
    mouseDown,
    mouseMove,
    mouseUp,
    touchStart,
    touchMove,
    touchEnd,
    resize
  );
}