import { Observable, Unsubscribable } from "rxjs";

import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createPrivateMatchQRCodeReaderProps,
  PropsCreatorParams,
} from "./procedure/create-private-match-qr-code-reader-props";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { startCamera } from "./procedure/start-camera";
import { stopCamera } from "./procedure/stop-camera";
import { PrivateMatchQRCodeReaderProps } from "./props";

/** プライベートマッチQRコードリーダーのパラメータ */
export type PrivateMatchQRCodeReaderParams = PropsCreatorParams;

/** プライベートマッチQRコードリーダー */
export class PrivateMatchQRCodeReader {
  /** プロパティ */
  #props: PrivateMatchQRCodeReaderProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PrivateMatchQRCodeReaderParams) {
    this.#props = createPrivateMatchQRCodeReaderProps(params);
    this.#unsubscribers = [];
  }

  /**
   * プライベートマッチQRコードリーダーを開始する
   */
  async start() {
    await startCamera(this.#props);
    show(this.#props);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * プライベートマッチQRコードリーダーを停止する
   * デストラクタ等でリソースを廃棄する場合も、本メソッドを呼び出すこと
   */
  stop(): void {
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
    stopCamera(this.#props);
  }

  /**
   * プライベートマッチQRコードリーダーを非表示にする
   */
  hidden(): void {
    hidden(this.#props);
  }

  /**
   * QRコード読み取りを通知する
   * @returns QRコード読み取りの通知
   */
  notifyReadQRCode(): Observable<string> {
    return this.#props.notificationOfReadQRCode;
  }

  /**
   * 閉じるを通知する
   * @returns 閉じるの通知
   */
  notifyClose(): Observable<void> {
    return this.#props.notificationOfClose;
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
