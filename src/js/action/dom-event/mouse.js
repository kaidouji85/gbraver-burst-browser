// @flow

import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";

/** マウスダウン */
export type MouseDown = {
  type: 'mouseDown',
  event: MouseEvent
};

/** マウスムーブ */
export type MouseMove = {
  type: 'mouseMove',
  event: MouseEvent
};

/** マウスアップ */
export type MouseUp = {
  type: 'mouseUp',
  event: MouseEvent
};

/**
 * マウスダウンストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @return ストリーム
 */
export function createMouseDownStream(renderDom: HTMLElement): Observable<MouseDown> {
  return fromEvent(renderDom, 'mousedown').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseDown', event: v}
    }));
}

/**
 * マウスムーブストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @return ストリーム
 */
export function createMouseMoveStream(renderDom: HTMLElement): Observable<MouseMove> {
  return fromEvent(renderDom, 'mousemove').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseMove', event: v};
    }));
}

/**
 * マウスアップストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @return ストリーム
 */
export function createMouseUpStream(renderDom: HTMLElement): Observable<MouseUp> {
  return fromEvent(renderDom, 'mouseup').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseUp', event: v};
    }));
}