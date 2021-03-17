// @flow

import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

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
export function createMouseDownStream(renderDom: HTMLElement): Stream<MouseDown> {
  const observable = fromEvent(renderDom, 'mousedown').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseDown', event: v}
    }));
  return toStream(observable);
}

/**
 * マウスムーブストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @return ストリーム
 */
export function createMouseMoveStream(renderDom: HTMLElement): Stream<MouseMove> {
  const observable =  fromEvent(renderDom, 'mousemove').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseMove', event: v};
    }));
  return toStream(observable);
}

/**
 * マウスアップストリームを生成する
 *
 * @param renderDom レンダラのDOM
 * @return ストリーム
 */
export function createMouseUpStream(renderDom: HTMLElement): Stream<MouseUp> {
  const observable =  fromEvent(renderDom, 'mouseup').pipe(
    map(v => {
      v.preventDefault();
      return {type: 'mouseUp', event: v};
    }));
  return toStream(observable);
}