// @flow

import {map as mapRXJS} from 'rxjs/operators';
import type {Stream} from "./core";
import {toStream} from "./rxjs";

export const map = <T, U>(fn: T => U): Function => (origin: Stream<T>): Stream<U> => {
  const rxjs = origin.getRxjsObservable().pipe(mapRXJS(fn));
  return toStream(rxjs);
}