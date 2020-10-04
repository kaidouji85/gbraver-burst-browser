// @flow

import {fromEvent, merge, Observable} from "rxjs";
import {map} from "rxjs/operators";

/**
 * HTML要素押下判定ストリーム
 *
 * @param dom 押下判定のHTML要素
 * @return ストリーム
 */
export function pushStream(dom: HTMLElement): Observable<void> {
  return merge(
    fromEvent(dom, 'click').pipe(
      map(v => {
        v.preventDefault();
      })
    ),

    fromEvent(dom, 'touchstart').pipe(
      map(v => {
        v.preventDefault();
      })
    )
  );
}