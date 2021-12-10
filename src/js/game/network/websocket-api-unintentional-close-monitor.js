// @flow

import type {WebsocketUnintentionalCloseNotifier} from '@gbraver-burst-network/browser-core';
import type {Stream, StreamSource, Unsubscriber} from "../../stream/core";
import {RxjsStreamSource, toStream} from "../../stream/rxjs";
import type {WebSocketAPIUnintentionalClose} from '../actions/game-actions';

/** WebSocketAPI意図しない切断監視 */
export class WebSocketAPIUnintentionalCloseMonitor {
  _notifier: StreamSource<WebSocketAPIUnintentionalClose>;
  _unsubscriber: ?Unsubscriber;

  /**
   * コンストラクタ
   */
  constructor() {
    this._notifier = new RxjsStreamSource();
    this._unsubscriber = null;
  }

  /**
   * WebSocketAPI意図しない切断監視を開始する
   *
   * @param api 監視対象となるWebsocketAPI
   */
  bind(api: WebsocketUnintentionalCloseNotifier): void {
    this.unbind();
    this._unsubscriber = toStream(api.websocketUnintentionalCloseNotifier()).subscribe(error => {
      this._notifier.next({type: 'WebSocketAPIUnintentionalClose', error});
    });
  }

  /**
   * WebSocketAPI意図しない切断監視を停止する
   */
  unbind(): void {
    if (!this._unsubscriber) {
      return;
    }

    this._unsubscriber.unsubscribe();
    this._unsubscriber = null;
  }

  /**
   * WebSocketAPI意図しない切断監視を通知する
   *
   * @return 通知ストリーム
   */
  notifier(): Stream<WebSocketAPIUnintentionalClose> {
    return this._notifier;
  }  
}