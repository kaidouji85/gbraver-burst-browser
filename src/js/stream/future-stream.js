// @flow
import type {Stream, StreamSource, Unsubscriber} from "./core";
import {RxjsStreamSource} from "./rxjs";

/**
 * 将来生成されるストリームを予め購読する
 *
 * @Template T ストリームのデータ型
 */
export interface FutureStream<T> {
  /**
   * 生成したストリームを関連付ける
   *
   * @param stream 関連付けするストリーム
   */
  bind(stream: Stream<T>): void;

  /**
   * ストリームを外す
   */
  unbind(): void;

  /**
   * 通知する
   *
   * @return ストリーム
   */
  notifier(): Stream<T>;
}

/** FutureStreamのシンプルな実装 */
class SimpleFutureSrream<T> implements FutureStream<T> {
  source: StreamSource<T>;
  unsubscriber: ?Unsubscriber;

  /**
   * コンストラクタ
   */
  constructor() {
    this.source = new RxjsStreamSource();
    this.unsubscriber = null;
  }

  /** @override */
  bind(stream: Stream<T>): void {
    this.unbind();
    this.unsubscriber = stream.subscribe(data => {
      this.source.next(data);
    });
  }

  /** @override */
  unbind(): void {
    this.unsubscriber && this.unsubscriber.unsubscribe();
    this.unsubscriber = null;
  }

  /** @override */
  notifier(): Stream<T> {
    return this.source;
  }
}

/**
 * FutureStreamを生成する
 *
 * @template T ストリームのデータ型
 * @return 生成結果
 */
export function futureStream<T>(): FutureStream<T> {
  return new SimpleFutureSrream();
}