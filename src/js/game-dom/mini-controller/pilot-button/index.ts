import { Observable, Unsubscribable } from "rxjs";

import { PilotButtonConfig } from "./config";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { disabled } from "./procedure/disabled";
import { engage } from "./procedure/engage";
import { createPilotButtonProps, PilotButtonProps } from "./props";

/** パイロットボタン */
export class PilotButton {
  /** プロパティ */
  #props: PilotButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPilotButtonProps();
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
  }

  /**
   * ルートHTML要素を取得する
   * @retur 取得結果
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
   * 設定をボタンに反映させる
   * @param config 反映させる設定
   */
  engage(config: Readonly<PilotButtonConfig>): void {
    engage(this.#props, config);
  }

  /**
   * パイロットボタンを強制的に無効化する
   * 本メソッドは親メソッドを非表示にする際に呼ばれる想定である
   */
  disabled(): void {
    disabled(this.#props);
  }
}
