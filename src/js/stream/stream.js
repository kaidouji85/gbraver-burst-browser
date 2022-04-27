// @flow
import {Observable, Subject, Subscription} from "rxjs";

/**
 * 購読停止オブジェクト
 */
export interface Unsubscriber {
  /** ストリームの購読を停止する */
  unsubscribe(): void;
}

/**
 * オペレータ
 * @template T 変換前のストリームデータ型
 * @template U 変換後のストリームデータ型
 */
export type Operator<T, U> = (v: Stream<T>) => Stream<U>;

/**
 * ストリーム
 * @template T ストリームが持つデータの型情報
 */
export interface Stream<T> {
  /**
   * ストリームを購読する
   *
   * @param listener イベントリスナ
   * @return 購読停止オブジェクト
   */
  subscribe(listener: (v: T) => void): Unsubscriber;

  /**
   * オペレータを適用する
   *
   * @param operator オペレータ
   * @return 適用結果
   */
  chain<U>(operator: Operator<T, U>): Stream<U>;

  /**
   * 本ストリームが内部的に持つrxjsのObservableを取得する
   * 本メソッドはストリーム加工ヘルパー関数の中でのみ呼ばれることを想定している
   *
   * @return rxjs Observable
   */
  getRxjsObservable(): typeof Observable;
}

/**
 * ストリームの源泉
 */
export interface StreamSource<T> extends Stream<T> {
  /**
   * ストリームに新しい値を流す
   *
   * @param v ストリームに流す値
   */
  next(v: T): void;
}

/**
 * RXJSストリーム
 * @template T データ型
 */
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

  /** @override */
  chain<U>(operator: Operator<T, U>): Stream<U> {
    return operator(this);
  }

  /** @override */
  subscribe(listener: (v: T) => void): Unsubscriber {
    const subscription = this._observable.subscribe(listener);
    return createUnSubscriber(subscription);
  }

  /** @override */
  getRxjsObservable(): typeof Observable {
    return this._observable;
  }
}

/**
 * RXJSストリームソース
 * @template T データ型
 */
class RxjsStreamSource<T> implements StreamSource<T> {
  _subject: typeof Subject;

  /**
   * コンストラクタ
   */
  constructor() {
    this._subject = new Subject<T>();
  }

  /** @override */
  next(v: T): void {
    this._subject.next(v);
  }

  /** @override */
  chain<U>(operator: Operator<T, U>): Stream<U> {
    return operator(this);
  }

  /** @override */
  subscribe(listener: (v: T) => void): Unsubscriber {
    const subscription = this._subject.subscribe((v: T) => {
      listener(v);
    });
    return createUnSubscriber(subscription);
  }

  /** @override */
  getRxjsObservable(): typeof Observable {
    return this._subject;
  }
}

/**
 * Streamを生成する
 *
 * @param observable RXJS Observable
 * @return 生成結果
 */
export function createStream<T>(observable: typeof Observable): Stream<T> {
  return new RxjsStream<T>(observable);
}

/**
 * unSubscribeを生成する
 *
 * @param subscription RXJS Subscription
 * @return 生成結果
 */
function createUnSubscriber(subscription: typeof Subscription): Unsubscriber {
  return {
    unsubscribe(): void {
      subscription.unsubscribe();
    }
  };
}

/**
 * StreamSourceを生成する
 *
 * @return 生成結果
 */
export function createStreamSource<T>(): StreamSource<T> {
  return new RxjsStreamSource<T>();
}