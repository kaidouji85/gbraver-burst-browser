import type { Battle } from "@gbraver-burst-network/browser-sdk";
import { Observable, Subject, Unsubscribable } from "rxjs";

/** 将来生成されるバトル管理オブジェクトからバトル強制終了ストリームを取り出す */
export class FutureSuddenlyBattleEnd {
  #notifier: Subject<void>;
  #unsubscriber: Unsubscribable | null;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#notifier = new Subject();
    this.#unsubscriber = null;
  }

  /**
   * バトル強制終了監視を開始する
   *
   * @param battle 監視対象となるバトル
   */
  bind(battle: Battle): void {
    this.unbind();
    this.#unsubscriber = battle.suddenlyBattleNotifier().subscribe(() => {
      this.#notifier.next();
    });
  }

  /**
   * バトル強制終了監視を停止する
   */
  unbind(): void {
    if (!this.#unsubscriber) {
      return;
    }

    this.#unsubscriber.unsubscribe();
    this.#unsubscriber = null;
  }

  /**
   * バトル強制終了ストリームを取得する
   *
   * @returns 通知ストリーム
   */
  stream(): Observable<void> {
    return this.#notifier;
  }
}
