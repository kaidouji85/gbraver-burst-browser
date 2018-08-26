// @flow

import type {DOMEvent} from "./index";
import {Observable, fromEvent, merge} from "rxjs";
import {map, publish} from 'rxjs/operators';

/**
 * DOMイベントリスナを生成する
 *
 * @param renderDom 　three.jsを描画するHTML要素
 * @return DOMイベントリスナ
 */
export function createDOMEventListener(renderDom: HTMLElement): Observable<DOMEvent> {
  const mouseDown = fromEvent(renderDom, 'mousedown')
    .pipe(map(v => ({type: 'mouseDown', event: v})));

  const mouseMove = fromEvent(renderDom, 'mousemove')
    .pipe(map(v => ({type: 'mouseMove', event: v})));

  const mouseUp = fromEvent(renderDom, 'mouseup')
    .pipe(map(v => ({type: 'mouseUp', event: v})));

  const touchStart = fromEvent(renderDom, 'touchstart')
    .pipe(map(v => ({type: 'touchStart', event: v})));

  const touchMove = fromEvent(renderDom, 'touchmove')
    .pipe(map(v => ({type: 'touchMove', event: v})));

  const touchEnd = fromEvent(renderDom, 'touchend').pipe(
    map(v => ({type: 'touchEnd', event: v}))
  );

  const domListener= merge(
    mouseDown,
    mouseMove,
    mouseUp,
    touchStart,
    touchMove,
    touchEnd
  );
  domListener.subscribe(v => v.event.preventDefault());

  return domListener;
}