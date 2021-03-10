// @flow

import {Observable} from "rxjs";

/**
 * 購読停止オブジェクト
 */
export interface UnSubscriber {
  /** ストリームの購読を停止する */
  unSubscribe(): void;
}

/**
 * ストリーム
 */
export interface Stream<T> {
  /**
   * ストリームを購読する
   *
   * @param listener イベントリスナ
   * @return 購読停止オブジェクト
   */
  subscribe(listener: (v: T) => void): UnSubscriber;

  /**
   * 本ストリームが内部的に持つrxjsのObservableを取得する
   * 本メソッドはストリーム加工ヘルパー関数の中でのみ呼ばれることを想定している
   *
   * @return rxjs Observable
   */
  getRxjsObservable(): typeof Observable;
}