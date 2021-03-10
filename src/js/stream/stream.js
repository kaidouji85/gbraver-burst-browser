// @flow

import {Observable} from "rxjs";
import type {UnSubscriber} from "./un-subscriber";

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

