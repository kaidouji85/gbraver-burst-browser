// @flow

import {map as mapRXJS, merge as mergeRXJS} from 'rxjs/operators';
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

/**
 * ストリームを合成する
 *
 * @param newItem 合成するストリーム
 * @return オペレータ
 */
export const merge = <T, U>(newItem: Stream<U>): Operator<T, U> => (origin: Stream<T>): Stream<U> => {
  const rxjs = mergeRXJS(origin.getRxjsObservable(), newItem.getRxjsObservable());
  return toStream(rxjs);
}