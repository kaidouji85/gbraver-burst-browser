// @flow

import type {WebsocketErrorNotifier} from '@gbraver-burst-network/browser-core';
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import {RxjsStreamSource, toStream} from "../../stream/rxjs";
import type {WebSocketAPIError} from '../actions/game-actions';

/** WebSocketAPIエラー監視 */
export class WebSocketAPIErrorMonitor {
  _notifier: StreamSource<WebSocketAPIError>;
  _unsubscriber: ?Unsubscriber;

  /**
   * コンストラクタ
   */
  constructor() {
    this._notifier = new RxjsStreamSource();
    this._unsubscriber = null;
  }

  /**
   * WebSocketAPIエラー監視を開始する
   *
   * @param api 監視対象となるWebsocketAPI
   */
  bind(api: WebsocketErrorNotifier): void {
    this.unbind();
    this._unsubscriber = toStream(api.websocketErrorNotifier()).subscribe(error => {
      this._notifier.next({type: 'WebSocketAPIError', error});
    });
  }

  /**
   * WebSocketAPIエラー監視を停止する
   */
  unbind(): void {
    if (!this._unsubscriber) {
      return;
    }

    this._unsubscriber.unsubscribe();
    this._unsubscriber = null;
  }

  /**
   * WebSocketAPIエラーを通知する
   *
   * @return 通知ストリーム
   */
  notifier(): Stream<WebSocketAPIError> {
    return this._notifier;
  }  
}