import { Observable, Unsubscribable } from "rxjs";
import { BurstButtonProps, createBurstButtonProps } from "./props";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { BurstButtonConfig } from "./config";
import { engage } from "./procedure/engage";

/** バーストボタン */
export class BurstButton {
  /** プロパティ */
  #props: BurstButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param config バーストボタン設定
   */
  constructor(config: BurstButtonConfig) {
    this.#props = createBurstButtonProps();
    this.#unsubscribers = bindEventListeners(this.#props);
    engage(this.#props, config);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    })
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
   * @return 通知ストリーム
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
