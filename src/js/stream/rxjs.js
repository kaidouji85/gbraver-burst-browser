// @flow

import {Observable, Subject, Subscription} from "rxjs";
import type {Stream, StreamSource, Unsubscriber} from "./core";

/**
 * RXJSのObservableをStreamに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toStream<T>(origin: typeof Observable): Stream<T> {
  return {
    subscribe(listener) {
      const subscription = origin.subscribe((v: T) => {
        listener(v);
      });
      return toUnSubscriber(subscription);
    },
    getRxjsObservable() {
      return origin;
    }
  };
}

/**
 * RXJSのSubscriptionをunSubscribeに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toUnSubscriber(origin: typeof Subscription): Unsubscriber {
  return {
    unsubscribe(): void {
      origin.unsubscribe();
    }
  };
}

/**
 * RXJSのストリーム源泉
 */
export class RxjsStreamSource<T> implements StreamSource<T> {
  _subject: typeof Subject;

  /**
   * コンストラクタ
   */
  constructor() {
    this._subject = new Subject<T>();
  }

  /**
   * ストリームに新しい値を流す
   *
   * @param v ストリームに流す値
   */
  next(v: T): void {
    this._subject.next(v);
  }

  /**
   * ストリームを購読する
   *
   * @param listener イベントリスナ
   * @return 購読停止オブジェクト
   */
  subscribe(listener: (v: T) => void): Unsubscriber {
    const subscription = this._subject.subscribe((v: T) => {
      listener(v);
    });
    return toUnSubscriber(subscription);
  }

  /**
   * 本ストリームが内部的に持つrxjsのObservableを取得する
   * 本メソッドはストリーム加工ヘルパー関数の中でのみ呼ばれることを想定している
   *
   * @return rxjs Observable
   */
  getRxjsObservable(): typeof Observable {
    return this._subject;
  }
}