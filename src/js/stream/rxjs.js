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
  return new RxjsStream<T>(origin);
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

/** RXJSストリーム */
class RxjsStream<T> implements Stream<T> {
  _observable: typeof Observable;

  /**
   * コンストラクタ
   *
   * @param observable RXJS Observable
   */
  constructor(observable: typeof Observable) {
    this._observable = observable;
  }

  /**
   * オペレータを適用する
   *
   * @param operator オペレータ
   * @return 適用結果
   */
  chain<U>(operator: (v: Stream<T>) => Stream<U>): Stream<U> {
    return operator(this);
  }

  /**
   * ストリームを購読する
   *
   * @param listener イベントリスナ
   * @return 購読停止オブジェクト
   */
  subscribe(listener: (v: T) => void): Unsubscriber {
    const subscription = this._observable.subscribe(listener);
    return toUnSubscriber(subscription);
  }

  /**
   * 本ストリームが内部的に持つrxjsのObservableを取得する
   * 本メソッドはストリーム加工ヘルパー関数の中でのみ呼ばれることを想定している
   *
   * @return rxjs Observable
   */
  getRxjsObservable(): typeof Observable {
    return this._observable;
  }
}

/** RXJSストリーム源泉 */
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
   * オペレータを適用する
   *
   * @param operator オペレータ
   * @return 適用結果
   */
  chain<U>(operator: (v: Stream<T>) => Stream<U>): Stream<U> {
    return operator(this);
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