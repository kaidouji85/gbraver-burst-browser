// @flow
import {fromEvent} from "rxjs";
import {map} from "../stream/operator";
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
  const origin = fromEvent(window, 'click');
  return createStream<Event>(origin)
    .chain(map(event => ({type: 'PushWindow', event})))
}