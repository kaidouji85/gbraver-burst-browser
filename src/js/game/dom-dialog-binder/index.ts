import { Observable, Subject, Unsubscribable } from "rxjs";

import type { DOMDialog } from "../../dom-dialogs/dialog";
import type { GameAction } from "../game-actions";
import type { DomDialogActionConnector } from "./dom-dialog-action-connector";

/** HTMLダイアログバインダー */
export class DOMDialogBinder {
  /** ルートHTML要素 */
  #root: HTMLElement;

  /** 現在表示しているダイアログ、何も表示していない場合はnullがセットされる */
  #dialog: DOMDialog | null;

  /** ゲームアクションストリーム */
  #gameAction: Subject<GameAction>;

  /** 案サブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#root = document.createElement("div");
    this.#dialog = null;
    this.#gameAction = new Subject();
    this.#unsubscribers = [];
  }

  /**
   * DOMダイアログをバインドする
   *
   * @template X ダイアログデータ型
   * @param dialog ダイアログ
   * @param connector アクションコネクタ
   */
  bind<X extends DOMDialog>(
    dialog: X,
    connector: DomDialogActionConnector<X>,
  ): void {
    this.#removeCurrentDialog();
    this.#unsubscribers = connector(dialog, this.#gameAction);
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
   * ゲームアクション通知
   *
   * @returns イベント通知ストリーム
   */
  gameActionNotifier(): Observable<GameAction> {
    return this.#gameAction;
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
    this.#dialog && this.#dialog.destructor();
    this.#dialog && this.#dialog.getRootHTMLElement().remove();
    this.#dialog = null;
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
    this.#unsubscribers = [];
  }
}
