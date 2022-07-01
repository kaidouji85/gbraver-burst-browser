// @flow
import {fromEvent} from "rxjs";
import {map, merge} from "../stream/operator";
import type {Stream} from "../stream/stream";
import {createStream} from "../stream/stream";

/** window押下情報 */
export type PushWindow = {
  type: 'PushWindow',
  event: Event,
}

/**
 * window押下ストリームを生成する
 *
 * @return window押下ストリーム
 */
export function pushWindowsStream(): Stream<PushWindow> {
  const click = createStream<Event>(fromEvent(window, 'click'))
    .chain(map(event => ({type: 'PushWindow', event})));
  const touchStart = createStream<Event>(fromEvent(window, 'touchstart'))
    .chain(map(event => ({type: 'PushWindow', event})));
  return click.chain(merge(touchStart));
}