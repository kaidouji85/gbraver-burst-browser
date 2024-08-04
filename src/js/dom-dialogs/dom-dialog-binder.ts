import { Unsubscribable } from "rxjs";

import { DOMDialog } from "./dialog";

/** HTMLダイアログバインダー */
export class DOMDialogBinder {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** 現在表示しているダイアログ、何も表示していない場合はnullがセットされる */
  #dialog: DOMDialog | null;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
    this.#dialog = null;
    this.#unsubscribers = [];
  }

  /**
   * DOMダイアログをバインドする
   * @template X ダイアログデータ型
   * @param dialog ダイアログ
   * @param unsubscribers バインドするダイアログに関するアンサブスクライバ
   */
  bind<X extends DOMDialog>(dialog: X, unsubscribers: Unsubscribable[]): void {
    this.#removeCurrentDialog();
    this.#unsubscribers = unsubscribers;
    this.#root.appendChild(dialog.getRootHTMLElement());
    this.#dialog = dialog;
  }

  /**
   * 現在表示しているダイアログを非表示にする
   */
  hidden(): void {
    this.#removeCurrentDialog();
  }

  /**
   * 本クラスのルートHTML要素を取得する
   *
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 現在表示しているダイアログを取り除く
   */
  #removeCurrentDialog(): void {
    this.#dialog?.destructor();
    this.#dialog?.getRootHTMLElement().remove();
    this.#dialog = null;
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#unsubscribers = [];
  }
}
