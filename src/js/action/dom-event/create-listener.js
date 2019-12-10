// @flow

import type {DOMEvent} from "./index";
import {fromEvent, merge, Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {createResizeStream} from "./resize";
import {createMouseDownStream, createMouseMoveStream, createMouseUpStream} from "./mouse";
import {createTouchEndStream, createTouchMoveStream, createTouchStartStream} from "./touch";

/**
 * DOMイベントリスナを生成する
 *
 * @param renderDom three.jsを描画するHTML要素
 * @return DOMイベントリスナ
 */
export function createDOMEventListener(renderDom: HTMLElement): Observable<DOMEvent> {
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
