// @flow

import {fromEvent, merge, Observable} from "rxjs";
import {map} from "rxjs/operators";

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
export function pushDOMStream(dom: HTMLElement): Observable<PushDOM> {
  return merge(
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
}