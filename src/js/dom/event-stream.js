// @flow
import { fromEvent } from "rxjs";

import { map, merge } from "../stream/operator";
import type { Stream } from "../stream/stream";
import { createStream } from "../stream/stream";

/** HTML要素が押下された時のアクション */
export type PushDOM = {
  type: "PushDOM",
  /** イベントオブジェクト */
  event: Event,
};

/**
 * HTML要素押下ストリーム
 *
 * @param dom 押下判定のHTML要素
 * @return ストリーム
 */
export function pushDOMStream(dom: HTMLElement): Stream<PushDOM> {
  const clickRXJS = fromEvent(dom, "click");
  const click = createStream<MouseEvent>(clickRXJS).chain(
    map((event) => {
      return { type: "PushDOM", event };
    })
  );

  const touchStartRXJS = fromEvent(dom, "touchstart");
  const touchStart = createStream<TouchEvent>(touchStartRXJS).chain(
    map((event) => {
      return { type: "PushDOM", event };
    })
  );

  return click.chain(merge(touchStart));
}

/** inputイベントをラッピングしたもの */
export type InputDOM = {
  type: "ChangeDOM",
  /** イベントオブジェクト */
  event: InputEvent,
};

/**
 * inputイベントからストリームを生成する
 *
 * @param dom ストリーム生成元のDOM
 * @returns 生成結果
 */
export function inputDOMStream(dom: HTMLInputElement): Stream<InputDOM> {
  return createStream(fromEvent(dom, "input")).chain(
    map((event) => ({ type: "ChangeDOM", event }))
  );
}
