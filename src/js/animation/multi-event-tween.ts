import { Tween } from "@tweenjs/tween.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Tweenのプロパティが不明な場合に使用する型 */
export type UnknownProps = Record<string, any>;
/* eslint-enable */

/** コールバック関数のデータ型 */
type CallBack<T extends UnknownProps> = (object: T) => void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export class MultiEventTween<T extends UnknownProps = any> extends Tween<T> {
  /* eslint-enable */

  /** onStartコールバックをあつめたもの */
  #onStartCallbacks: CallBack<T>[] = [];
  /** onCompleteコールバックをあつめたもの */
  #onCompleteCallbacks: CallBack<T>[] = [];

  /**
   * コンストラクタ
   * @param object Tweenの対象オブジェクト
   */
  constructor(object: T) {
    super(object);
    super.onStart((object) => {
      this.#onStartCallbacks.forEach((fn) => {
        fn(object);
      });
    });
    super.onComplete((object) => {
      this.#onCompleteCallbacks.forEach((fn) => {
        fn(object);
      });
    });
  }

  /** @override */
  onStart(callback?: CallBack<T>): this {
    if (callback) {
      this.#onStartCallbacks = [...this.#onStartCallbacks, callback];
    }
    return this;
  }

  /** @override */
  onComplete(callback?: (object: T) => void): this {
    if (callback) {
      this.#onCompleteCallbacks = [...this.#onCompleteCallbacks, callback];
    }
    return this;
  }
}
