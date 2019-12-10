// @flow

import type {DOMEvent} from "./index";
import {fromEvent, merge, Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {createResizeStream} from "./resize";

/**
 * DOMイベントリスナを生成する
 *
 * @param renderDom three.jsを描画するHTML要素
 * @return DOMイベントリスナ
 */
export function createDOMEventListener(renderDom: HTMLElement): Observable<DOMEvent> {
  const mouseDown = fromEvent(renderDom, 'mousedown').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseDown', event: v}
    }));

  const mouseMove = fromEvent(renderDom, 'mousemove').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseMove', event: v};
    }));

  const mouseUp = fromEvent(renderDom, 'mouseup').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseUp', event: v};
    }));

  const touchStart = fromEvent(renderDom, 'touchstart').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'touchStart', event: v};
    }));

  const touchMove = fromEvent(renderDom, 'touchmove').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'touchMove', event: v}
    }));

  const touchEnd = fromEvent(renderDom, 'touchend').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'touchEnd', event: v};
    }));

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
