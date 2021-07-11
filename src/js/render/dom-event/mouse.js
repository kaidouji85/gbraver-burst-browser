// @flow

import {fromEvent} from "rxjs";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";
import {map} from "../../stream/operator";

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
  const observable = fromEvent(renderDom, 'mousedown');
  return toStream<MouseEvent>(observable)
    .chain(map(v => {
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
export function createMouseMoveStream(renderDom: HTMLElement): Stream<MouseMove> {
  const observable = fromEvent(renderDom, 'mousemove');
  return toStream<MouseEvent>(observable)
    .chain(map(v => {
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
export function createMouseUpStream(renderDom: HTMLElement): Stream<MouseUp> {
  const observable = fromEvent(renderDom, 'mouseup');
  return toStream<MouseEvent>(observable)
    .chain(map(v => {
      v.preventDefault();
      return {type: 'mouseUp', event: v};
    }));
}