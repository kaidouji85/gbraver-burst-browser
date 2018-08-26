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
  const mouseDown = fromEvent(renderDom, 'mousedown').pipe(
    map(v => ({type: 'mouseDown', event: v}))
  );

  const touchStart = fromEvent(renderDom, 'touchstart').pipe(
    map(v => ({type: 'touchStart', event: v}))
  );

  return merge(
    mouseDown,
    touchStart
  );
}