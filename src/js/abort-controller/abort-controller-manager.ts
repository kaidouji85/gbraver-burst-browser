import { AbortControllerContainer } from "./abort-controller-container";

/**
 * AbortController管理オブジェクト
 * Abortされた場合にあたらしいAbortControllerを生成する
 * 本クラスはゲーム内で一つのみ生成される想定である
 */
export class AbortControllerManager implements AbortControllerContainer {
  /** @override */
  abortController: AbortController;
  /**
   * @private
   *
   * プライベート関数#onAbortをthisでbindした関数
   * bind(this)は新しい関数を生成するため、以下コードではコールバック関数の削除が正しく行えない
   * そのため、本プロパティにbindした関数を保持し、コールバック関数の削除を行えるようにする。
   *
   * ```typescript
   * abortController.signal.addEventListener("abort", this.#onAbort.bind(this));
   * abortController.signal.removeEventListener("abort", this.#onAbort.bind(this));
   * ```
   */
  readonly #onAboutBound: () => void;

  /**
   * コンストラクタ
   */
  constructor() {
    this.abortController = new AbortController();
    this.#onAboutBound = this.#onAbort.bind(this);
    this.abortController.signal.addEventListener("abort", this.#onAboutBound);
  }

  /**
   * AbortControllerがabortされた際の処理
   * @private
   */
  #onAbort() {
    this.abortController.signal.removeEventListener(
      "abort",
      this.#onAboutBound,
    );

    this.abortController = new AbortController();
    this.abortController.signal.addEventListener("abort", this.#onAboutBound);
  }
}
