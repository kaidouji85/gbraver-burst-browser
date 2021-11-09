// @flow

import {fromEvent} from "rxjs";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";
import {map, merge} from '../../stream/operator';

/** HTML要素が押下された時のアクション */
export type PushDOM = {
  type: 'PushDOM',
};

// TODO アクションにEventオブジェクトをセットして、サブスクライブ側でpreventDefault、stopPropagationを直接呼び出すようにする
/**
 * HTML要素押下ストリーム
 *
 * @param dom 押下判定のHTML要素
 * @param isPreventDefault event.preventDefault()を呼び出すか否か、trueで呼び出す
 * @param  isStopPropagation event.stopPropagation()を呼び出すか否か、trueで呼び出す
 * @return ストリーム
 */
export function pushDOMStream(dom: HTMLElement, isPreventDefault: boolean = true, isStopPropagation: boolean = true): Stream<PushDOM> {
  const clickRXJS = fromEvent(dom, 'click');
  const click = toStream<MouseEvent>(clickRXJS)
    .chain(map(event => {
      isPreventDefault && event.preventDefault();
      isStopPropagation && event.stopPropagation();
      return {type: 'PushDOM'};
    }));

  const touchStartRXJS = fromEvent(dom, 'touchstart');
  const touchStart = toStream<TouchEvent>(touchStartRXJS)
    .chain(map(event => {
      isPreventDefault && event.preventDefault();
      isStopPropagation && event.stopPropagation();
      return {type: 'PushDOM'};
    }));

  return click
    .chain(merge(touchStart));
}