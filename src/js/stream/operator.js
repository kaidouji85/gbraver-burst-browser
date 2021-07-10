// @flow

import {map as mapRXJS} from 'rxjs/operators';
import type {Operator, Stream} from "./core";
import {toStream} from "./rxjs";

/**
 * ストリームデータを変換する
 *
 * @param fn 変換関数
 * @return オペレータ
 */
export const map = <T, U>(fn: T => U): Operator<T, U> => (origin: Stream<T>): Stream<U> => {
  const rxjs = origin.getRxjsObservable()
    .pipe(mapRXJS(fn));
  return toStream(rxjs);
}