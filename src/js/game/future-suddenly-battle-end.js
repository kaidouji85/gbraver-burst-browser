// @flow
import type {Battle} from '@gbraver-burst-network/browser-core';
import type {Stream, StreamSource, Unsubscriber} from "../stream/core";
import {RxjsStreamSource, toStream} from "../stream/rxjs";

/** 将来生成されるバトル管理オブジェクトからバトル強制終了ストリームを取り出す */
export class FutureSuddenlyBattleEnd {
  _notifier: StreamSource<void>;
  _unsubscriber: ?Unsubscriber;

  /**
   * コンストラクタ
   */
  constructor() {
    this._notifier = new RxjsStreamSource();
    this._unsubscriber = null;
  }

  /**
   * バトル強制終了監視を開始する
   *
   * @param battle 監視対象となるバトル
   */
  bind(battle: Battle): void {
    this.unbind();
    this._unsubscriber = toStream(battle.suddenlyBattleNotifier()).subscribe(() => {
      this._notifier.next();
    });
  }

  /**
   * バトル強制終了監視を停止する
   */
  unbind(): void {
    if (!this._unsubscriber) {
      return;
    }

    this._unsubscriber.unsubscribe();
    this._unsubscriber = null;
  }

  /**
   * バトル強制終了ストリームを取得する
   *
   * @return 通知ストリーム
   */
  stream(): Stream<void> {
    return this._notifier;
  }
}