// @flow

import {Observable, Subscription} from "rxjs";
import type {Stream, UnSubscriber} from "./core";

/**
 * RXJSのObservableをStreamに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toStream<T>(origin: Observable<T>/* TODO typeof Observable に変更する */): Stream<T> {
  return {
    subscribe(listener) {
      const subscription = origin.subscribe((v: T) => {
        listener(v);
      });
      return toUnSubscriber((subscription: any));
    },
    getRxjsObservable() {
      return (origin: any);
    }
  };
}

/**
 * RXJSのSubscriptionをunSubscribeに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toUnSubscriber(origin: Subscription /* TODO typeof Subscription に変更する*/): UnSubscriber {
  return {
    unSubscribe(): void {
      origin.unsubscribe();
    }
  };
}