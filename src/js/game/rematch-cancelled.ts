import { RematchRoom } from "@gbraver-burst-network/browser-sdk";
import { Observable, Subject, Unsubscribable } from "rxjs";

/** 再戦ルームからキャンセル通知ストリームを取り出す */
export class RematchCancelled {
  /** 中間ストリーム */
  #notifier: Subject<void>;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable | null;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#notifier = new Subject();
    this.#unsubscriber = null;
  }

  /**
   * 再戦キャンセル監視を開始する
   * @param room 監視対象となるルーム
   */
  bind(room: RematchRoom): void {
    this.unbind();
    this.#unsubscriber = room.rematchCancelledNotifier().subscribe(() => {
      this.#notifier.next();
    });
  }

  /**
   * 再戦キャンセル監視を停止する
   */
  unbind(): void {
    if (!this.#unsubscriber) {
      return;
    }

    this.#unsubscriber.unsubscribe();
    this.#unsubscriber = null;
  }

  /**
   * 再戦キャンセルストリームを取得する
   * @returns 通知ストリーム
   */
  stream(): Observable<void> {
    return this.#notifier;
  }
}
