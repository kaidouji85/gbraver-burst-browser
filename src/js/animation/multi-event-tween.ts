import { Tween } from "@tweenjs/tween.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Tweenのプロパティが不明な場合に使用する型 */
export type UnknownProps = Record<string, any>;
/* eslint-enable */

/* eslint-disable @typescript-eslint/no-explicit-any */
export class MultiEventTween<T extends UnknownProps = any> extends Tween<T> {
  /* eslint-enable */

  /** onStartコールバックをあつめたもの */
  #onStartCallbacks: Array<(object: T) => void> = [];
  /** onCompleteコールバックをあつめたもの */
  #onCompleteCallbacks: Array<(object: T) => void> = [];
  /** onUpdateコールバックをあつめたもの */
  #onUpdateCallbacks: Array<(object: T, elapsed: number) => void> = [];

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
    super.onUpdate((object, elapsed) => {
      this.#onUpdateCallbacks.forEach((fn) => {
        fn(object, elapsed);
      });
    });
  }

  /** @override */
  onStart(callback?: (object: T) => void): this {
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

  /** @override */
  onUpdate(callback?: (object: T, elapsed: number) => void): this {
    if (callback) {
      this.#onUpdateCallbacks = [...this.#onUpdateCallbacks, callback];
    }
    return this;
  }
}
