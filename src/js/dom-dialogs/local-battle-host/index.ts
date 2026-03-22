import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createLocalBattleHostDialogProps,
  CreateLocalBattleHostDialogPropsOptions,
} from "./procedures/create-local-battle-host-dialog-props";
import { LocalBattleHostDialogProps } from "./props";

/** ローカル対戦ホストダイアログのオプション */
export type LocalBattleHostDialogOptions =
  CreateLocalBattleHostDialogPropsOptions;

/** ローカル対戦ホストダイアログ */
export class LocalBattleHostDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleHostDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: LocalBattleHostDialogOptions) {
    this.#props = createLocalBattleHostDialogProps(options);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ダイアログが閉じられたことを通知を取得する
   * @returns 通知ストリーム
   */
  notifyDialogClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }
}
