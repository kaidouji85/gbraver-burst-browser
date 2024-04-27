import { Observable, Unsubscribable } from "rxjs";

import { BurstButtonConfig } from "./config";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { engage } from "./procedure/engage";
import { BurstButtonProps, createBurstButtonProps } from "./props";

/** バーストボタン */
export class BurstButton {
  /** プロパティ */
  #props: BurstButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createBurstButtonProps();
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ルートHTML要素を取得する
   * @return
   */
  getRootHTMLElement(): HTMLButtonElement {
    return this.#props.root;
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  pushNotifier(): Observable<void> {
    return this.#props.push;
  }

  /**
   * 設定を反映させる
   * @param config 反映させる設定
   */
  engage(config: BurstButtonConfig): void {
    engage(this.#props, config);
  }
}
