// @flow

import {Observable, Subject, Subscription} from "rxjs";
import type {Stream, StreamSource, Unsubscriber} from "./core";

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
      // TODO rxjsのflow-typedを削除したら、:anyを消す
      return toUnSubscriber((subscription: any));
    },
    getRxjsObservable() {
      // TODO rxjsのflow-typedを削除したら、:anyを消す
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
export function toUnSubscriber(origin: Subscription /* TODO typeof Subscription に変更する*/): Unsubscriber {
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
  _subject: Subject<T>; // TODO rxjsのflow-typedを削除したら、typeof Subject に変更する

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
    // TODO rxjsのflow-typedを削除したら、:anyを消す
    return toUnSubscriber((subscription: any));
  }

  /**
   * 本ストリームが内部的に持つrxjsのObservableを取得する
   * 本メソッドはストリーム加工ヘルパー関数の中でのみ呼ばれることを想定している
   *
   * @return rxjs Observable
   */
  getRxjsObservable(): typeof Observable {
    // TODO rxjsのflow-typedを削除したら、:anyを消す
    return (this._subject: any);
  }
}