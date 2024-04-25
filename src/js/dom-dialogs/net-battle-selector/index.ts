import { Observable, Unsubscribable } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { DOMDialog } from "../dialog";
import { onBackgroundPush } from "./listeners/on-background-push";
import { onCasualMatchSelect } from "./listeners/on-casual-match-select";
import { onCloserPush } from "./listeners/on-closer-push";
import { onPrivateMatchGuestSelect } from "./listeners/on-private-match-guest-select";
import { onPrivateMatchHostSelect } from "./listeners/on-private-match-host-select";
import {
  createNetBattleSelectrProps,
  NetBattleSelectorDialogProps,
  PropsCreatorParams,
} from "./props";

/** コンストラクタのパラメータ */
export type NetBattleSelectorDialogParams = PropsCreatorParams;

/** ネットバトルセレクターダイアログ */
export class NetBattleSelectorDialog implements DOMDialog {
  /** プロパティ */
  #props: NetBattleSelectorDialogProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params コンストラクタのパラメータ
   */
  constructor(params: NetBattleSelectorDialogParams) {
    this.#props = createNetBattleSelectrProps(params);
    this.#unsubscribers = [
      domPushStream(this.#props.casualMatchButton).subscribe((action) =>
        onCasualMatchSelect(this.#props, action),
      ),
      domPushStream(this.#props.privateMatchHostButton).subscribe((action) =>
        onPrivateMatchHostSelect(this.#props, action),
      ),
      domPushStream(this.#props.privateMatchGuestButton).subscribe((action) =>
        onPrivateMatchGuestSelect(this.#props, action),
      ),
      domPushStream(this.#props.closer).subscribe((action) =>
        onCloserPush(this.#props, action),
      ),
      domPushStream(this.#props.backGround).subscribe((action) =>
        onBackgroundPush(this.#props, action),
      ),
    ];
  }

  /** @override  */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * カジュアルマッチを選択したことを通知する
   * @returns 通知ストリーム
   */
  notifyCasualMatchSelection(): Observable<void> {
    return this.#props.casualMatchSelection;
  }

  /**
   * プライベートマッチ（ホスト）を選択したことを通知する
   * @returns 通知ストリーム
   */
  notifyPrivateMatchHostSelection(): Observable<void> {
    return this.#props.privateMatchHostSelection;
  }

  /**
   * プライベートマッチ（ゲスト）を選択したことを通知する
   * @returns 通知ストリーム
   */
  notifyPrivateMatchGuestSelection(): Observable<void> {
    return this.#props.privateMatchGuestSelection;
  }

  /**
   * ダイアログクローズを通知する
   * @returns 通知ストリーム
   */
  notifyClosed(): Observable<void> {
    return this.#props.dialogClosed;
  }
}
