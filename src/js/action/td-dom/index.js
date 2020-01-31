// @flow

import type {Resize} from "../resize/resize";
import {createResizeStream} from "../resize/resize";
import type {MouseDown, MouseMove, MouseUp} from "./mouse";
import {createMouseDownStream, createMouseMoveStream, createMouseUpStream} from "./mouse";
import type {TouchEnd, TouchMove, TouchStart} from "./touch";
import {createTouchEndStream, createTouchMoveStream, createTouchStartStream} from "./touch";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators";

/** three.jsキャンバス要素のイベントをまとめたもの */
export type TdDOMEvent =
  Resize |  // TODO 削除する
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

  const resize: Observable<TdDOMEvent> = createResizeStream().pipe(
    map(v => (v: TdDOMEvent))
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