import { fromEvent } from "rxjs";
import { map } from "../../stream/operator";
import type { Stream } from "../../stream/stream";
import { createStream } from "../../stream/stream";

/** タッチスタート */
export type TouchStart = {
  type: "touchStart";
  event: TouchEvent;
};

/** タッチムーブ */
export type TouchMove = {
  type: "touchMove";
  event: TouchEvent;
};

/** タッチエンドイベント */
export type TouchEnd = {
  type: "touchEnd";
  event: TouchEvent;
};

/**
 * タッチスタートストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @return ストリーム
 */
export function createTouchStartStream(renderDom: HTMLElement): Stream<TouchStart> {
  const observable = fromEvent(renderDom, "touchstart");
  return createStream<TouchEvent>(observable).chain(map(v => {
    v.preventDefault();
    return {
      type: "touchStart",
      event: v
    };
  }));
}

/**
 * タッチムーブストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @return ストリーム
 */
export function createTouchMoveStream(renderDom: HTMLElement): Stream<TouchMove> {
  const observable = fromEvent(renderDom, "touchmove");
  return createStream<TouchEvent>(observable).chain(map(v => {
    v.preventDefault();
    return {
      type: "touchMove",
      event: v
    };
  }));
}

/**
 * タッチエンドストリームを生成する
 *
 * @param renderDom レンダラーDOM
 * @return ストリーム
 */
export function createTouchEndStream(renderDom: HTMLElement): Stream<TouchEnd> {
  const observable = fromEvent(renderDom, "touchend");
  return createStream<TouchEvent>(observable).chain(map(v => {
    v.preventDefault();
    return {
      type: "touchEnd",
      event: v
    };
  }));
}