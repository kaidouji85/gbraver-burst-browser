// @flow

import type {Battle} from '@gbraver-burst-network/browser-core';
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import {RxjsStreamSource, toStream} from "../../stream/rxjs";
import type {SuddenlyBattleEnd} from "../actions/game-actions";

/** バトル強制終了 監視 */
export class SuddenlyBattleEndMonitor {
  _notifier: StreamSource<SuddenlyBattleEnd>;
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
      this._notifier.next({type: 'SuddenlyBattleEnd'});
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
   * バトル強制終了を通知する
   *
   * @return 通知ストリーム
   */
  notifier(): Stream<SuddenlyBattleEnd> {
    return this._notifier;
  }
}