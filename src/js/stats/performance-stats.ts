import { Unsubscribable } from "rxjs";
import Stats from "stats.js";

import { gameLoopStream } from "../game-loop/game-loop";

/** パフォーマンス統計 */
export class PerformanceStats {
  /** Statsインスタンス */
  #stats: Stats;
  /** アンサブスクライバ */
  #unsusbscriber: Unsubscribable;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#stats = new Stats();
    this.#stats.dom.style.position = "absolute";
    this.#stats.dom.style.top = "env(safe-area-inset-top)";
    this.#stats.dom.style.left = "max(env(safe-area-inset-left), 10vw)";
    this.#stats.dom.style.right = "auto";
    this.#unsusbscriber = gameLoopStream().subscribe(() => {
      this.#onUpdate();
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    this.#unsusbscriber.unsubscribe();
  }

  /**
   * ルート要素を取得する
   * @returns ルート要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#stats.dom;
  }

  /**
   * Update時の処理
   */
  #onUpdate(): void {
    this.#stats.update();
  }
}
