import { Tween } from "@tweenjs/tween.js";

/** Tweenのプロパティが不明な場合に使用する型 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type UnknownProps = Record<string, any>;

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Gブレイバーバーストでの利用に最適化したTween */
export class GBTween<T extends UnknownProps = any> extends Tween<T> {
  /* eslint-enable */

  /** onStartコールバックをあつめたもの */
  #onStartCallbacks: Array<(object: T) => void> = [];
  /** onCompleteコールバックをあつめたもの */
  #onCompleteCallbacks: Array<(object: T) => void> = [];
  /** onUpdateコールバックをあつめたもの */
  #onUpdateCallbacks: Array<(object: T, elapsed: number) => void> = [];
  /** chain先のTween */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  #chainedTweens: GBTween<any>[] = [];

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

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /** @override */
  chain(...tweens: GBTween<any>[]): this {
    /* eslint-enable */
    this.#chainedTweens = tweens;
    return super.chain(...tweens);
  }

  /**
   * chain先のTweenを取得する
   * @returns chain先のTween
   */
  getChainedTweens(): GBTween[] {
    return this.#chainedTweens;
  }
}
