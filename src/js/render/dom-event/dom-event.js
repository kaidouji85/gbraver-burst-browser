// @flow

import type {MouseDown, MouseMove, MouseUp} from "./mouse";
import {createMouseDownStream, createMouseMoveStream, createMouseUpStream} from "./mouse";
import type {TouchEnd, TouchMove, TouchStart} from "./touch";
import {createTouchEndStream, createTouchMoveStream, createTouchStartStream} from "./touch";
import type {Stream} from "../../stream/core";
import {merge, map} from "../../stream/operator";

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
  return createMouseDownStream(renderDom)
    .chain(merge(createMouseMoveStream(renderDom)))
    .chain(merge(createMouseUpStream(renderDom)))
    .chain(merge(createTouchStartStream(renderDom)))
    .chain(merge(createTouchMoveStream(renderDom)))
    .chain(merge(createTouchEndStream(renderDom)))
    .chain(map(v => (v: RendererDOMEvent)));
}