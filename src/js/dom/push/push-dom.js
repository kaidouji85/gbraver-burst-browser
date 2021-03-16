// @flow

import {fromEvent, merge} from "rxjs";
import {map} from "rxjs/operators";
import type {Stream} from "../../stream/core";
import {toStream} from "../../stream/rxjs";

/**
 * HTML要素が押下された時のアクション
 */
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
  const observable = merge(
    fromEvent(dom, 'click').pipe(
      map(v => {
        v.preventDefault();
        return {
          type: 'PushDOM'
        };
      })
    ),

    fromEvent(dom, 'touchstart').pipe(
      map(v => {
        v.preventDefault();
        return {
          type: 'PushDOM'
        };
      })
    )
  );
  // TODO rxjsのflow-typedを消したら :any を削除する
  return toStream((observable: any));
}