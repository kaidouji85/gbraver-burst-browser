// @flow

import type {MouseDown, MouseMove, MouseUp} from "./mouse";
import {createMouseDownStream, createMouseMoveStream, createMouseUpStream} from "./mouse";
import type {TouchEnd, TouchMove, TouchStart} from "./touch";
import {createTouchEndStream, createTouchMoveStream, createTouchStartStream} from "./touch";
import {merge, Observable} from "rxjs";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

/** three.js Renderer要素のイベントをまとめたもの */
export type RendererDOMEvent =
  MouseDown |
  MouseMove |
  MouseUp |
  TouchStart |
  TouchMove |
  TouchEnd;

/**
 * three.js Renderer要素のイベントストリームを生成する
 *
 * @param renderDom three.jsを描画するHTML要素
 * @return ストリーム
 */
export function createDOMEventStream(renderDom: HTMLElement): Stream<RendererDOMEvent> {
  const streams: Observable<RendererDOMEvent>[] = [
    createMouseDownStream(renderDom),
    createMouseMoveStream(renderDom),
    createMouseUpStream(renderDom),
    createTouchStartStream(renderDom),
    createTouchMoveStream(renderDom),
    createTouchEndStream(renderDom),
  ]
    .map(v => v.getRxjsObservable())
    // TODO rxjsのflow-typedを消したら、この行を削除する
    .map(v => ((v: any): Observable<RendererDOMEvent>));
  const observable = merge(...streams);
  return toStream(observable);
}