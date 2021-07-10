// @flow

import {fromEvent} from "rxjs";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";
import {map, merge} from '../../stream/operator';

/** HTML要素が押下された時のアクション */
export type PushDOM = {
  type: 'PushDOM'
};

/**
 * HTML要素押下ストリーム
 *
 * @param dom 押下判定のHTML要素
 * @return ストリーム
 */
export function pushDOMStream(dom: HTMLElement): Stream<PushDOM> {
  const clickRXJS = fromEvent(dom, 'click');
  const click = toStream<MouseEvent>(clickRXJS)
    .chain(map(e => {
      e.preventDefault();
      return {type: 'PushDOM'};
    }));

  const touchStartRXJS = fromEvent(dom, 'touchstart');
  const touchStart = toStream<TouchEvent>(touchStartRXJS)
    .chain(map(e => {
      e.preventDefault();
      return {type: 'PushDOM'};
    }));

  return click
    .chain(merge(touchStart));
}