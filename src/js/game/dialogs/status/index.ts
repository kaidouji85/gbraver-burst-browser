import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createStatusDialogProps,
  StatusDialogPropsCreatorOptions,
} from "./procedures/create-status-dialog-props";
import { StatusDialogProps } from "./props";

/** コンストラクタのオプション */
export type StatusDialogOptions = StatusDialogPropsCreatorOptions;

/** ステータスダイアログ */
export class StatusDialog implements DOMDialog {
  /** プロパティ */
  readonly #props: StatusDialogProps;
  /** アンサブスクライバブル */
  readonly #unsubscribables: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: StatusDialogOptions) {
    this.#props = createStatusDialogProps(options);
    this.#unsubscribables = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribables.forEach((unsub) => unsub.unsubscribe());
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 閉じる通知
   * @returns オブザーバブル
   */
  notifyClose(): Observable<void> {
    return this.#props.closeNotifier.asObservable();
  }
}
