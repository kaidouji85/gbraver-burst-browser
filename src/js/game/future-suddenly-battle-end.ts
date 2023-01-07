import type { Battle } from "@gbraver-burst-network/browser-core";
import type { Stream, StreamSource, Unsubscriber } from "../stream/stream";
import { createStream, createStreamSource } from "../stream/stream";

/** 将来生成されるバトル管理オブジェクトからバトル強制終了ストリームを取り出す */
export class FutureSuddenlyBattleEnd {
  #notifier: StreamSource<void>;
  #unsubscriber: Unsubscriber | null;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#notifier = createStreamSource();
    this.#unsubscriber = null;
  }

  /**
   * バトル強制終了監視を開始する
   *
   * @param battle 監視対象となるバトル
   */
  bind(battle: Battle): void {
    this.unbind();
    this.#unsubscriber = createStream(battle.suddenlyBattleNotifier()).subscribe(() => {
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
   * @return 通知ストリーム
   */
  stream(): Stream<void> {
    return this.#notifier;
  }

}