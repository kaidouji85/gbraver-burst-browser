// @flow

import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

/** タッチスタート */
export type TouchStart = {
  type: 'touchStart',
  event: TouchEvent
};

/** タッチムーブ */
export type TouchMove = {
  type: 'touchMove',
  event: TouchEvent
};

/** タッチエンドイベント */
export type TouchEnd = {
  type: 'touchEnd',
  event: TouchEvent
};

/**
 * タッチスタートストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @return ストリーム
 */
export function createTouchStartStream(renderDom: HTMLElement): Stream<TouchStart> {
  const observable = fromEvent(renderDom, 'touchstart').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'touchStart', event: v};
    }));
  return toStream(observable);
}

/**
 * タッチムーブストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @return ストリーム
 */
export function createTouchMoveStream(renderDom: HTMLElement): Stream<TouchMove> {
  const observable = fromEvent(renderDom, 'touchmove').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'touchMove', event: v}
    }));
  return toStream(observable);
}

/**
 * タッチエンドストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @return ストリーム
 */
export function createTouchEndStream(renderDom: HTMLElement): Stream<TouchEnd> {
  const observable = fromEvent(renderDom, 'touchend').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'touchEnd', event: v};
    }));
  return toStream(observable);
}