import { Observable, Unsubscribable } from "rxjs";

import { DOMDialog } from "../dialog";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createLocalBattleGuestDialogProps,
  CreateLocalBattleGuestDialogPropsOptions,
} from "./procedure/create-local-battle-guest-dialog-props";
import { BattleStartPayload, LocalBattleGuestDialogProps } from "./props";

/** ローカル対戦ゲストのダイアログのオプション */
export type LocalBattleGuestDialogOptions =
  CreateLocalBattleGuestDialogPropsOptions;

/** ローカル対戦ゲストのダイアログ */
export class LocalBattleGuestDialog implements DOMDialog {
  /** プロパティ */
  #props: LocalBattleGuestDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: LocalBattleGuestDialogOptions) {
    this.#props = createLocalBattleGuestDialogProps(options);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * バトルスタートを通知する
   * @returns バトルスタート通知ストリーム
   */
  notifyBattleStart(): Observable<BattleStartPayload> {
    return this.#props.battleStartSubject;
  }
}
