import { Unsubscribable } from "rxjs";
import { BurstButtonProps, createBurstButtonProps } from "./props";
import { bindEventListeners } from "./procedure/bind-event-listeners";

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
}