// @flow

import {merge as mergeRXJS} from "rxjs";
import {
  map as mapRXJS,
  tap as tapRXJS,
  filter as filterRXJS,
  first as firstRXJS,
  share as shareRXJS
} from 'rxjs/operators';
import type {Operator, Stream} from "./stream";
import {createStream} from "./stream";

/**
 * ストリームデータを変換する
 *
 * @template T 変換前のストリームデータ型
 * @template U 変換後のストリームデータ型
 * @param fn 変換関数
 * @return オペレータ
 */
export const map = <T, U>(fn: T => U): Operator<T, U> => (origin: Stream<T>): Stream<U> => {
  const observable = origin.getRxjsObservable()
    .pipe(mapRXJS(fn));
  return createStream(observable);
}

/**
 * ストリームデータを変更せずに副作用のある操作を行う
 * 
 * @template T ストリームデータ型
 * @param fn 副作用操作を行う関数
 * @return オペレータ
 */
export const tap = <T>(fn: T => void): Operator<T, T> => (origin: Stream<T>): Stream<T> => {
  const observable = origin.getRxjsObservable()
    .pipe(tapRXJS(fn));
  return createStream(observable);
}

/**
 * 条件を満たさないストリームを止める
 *
 * @template T ストリームデータ型
 * @param fn 判定関数
 * @return オペレータ
 */
export const filter = <T>(fn: T => boolean): Operator<T, T> => (origin: Stream<T>): Stream<T> => {
  const observable = origin.getRxjsObservable()
    .pipe(filterRXJS(fn));
  return createStream(observable);
}

/**
 * 最初のストリーム以外は止める
 *
 * @template T ストリームデータ型
 * @return オペレータ
 */
export const first = <T>(): Operator<T, T> =>  (origin: Stream<T>): Stream<T> => {
  const observable = origin.getRxjsObservable()
    .pipe(firstRXJS());
  return createStream(observable);
}

/**
 * RXJSのshareを呼び出す
 *
 * @return オペレータ
 */
export const share = <T>(): Operator<T, T> => (origin: Stream<T>): Stream<T> => {
  const observable = origin.getRxjsObservable()
    .pipe(shareRXJS());
  return createStream(observable);
}

/**
 * ストリームを合成する
 *
 * @template T 合成元のストリームデータ型
 * @template U 合成するストリームデータ型
 * @param newItem 合成するストリーム
 * @return オペレータ
 */
export const merge = <T, U>(newItem: Stream<U>): Operator<T, T | U> => (origin: Stream<T>): Stream<T | U> => {
  const observable = mergeRXJS(origin.getRxjsObservable(), newItem.getRxjsObservable());
  return createStream(observable);
}