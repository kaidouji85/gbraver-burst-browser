// @flow
import type {WebsocketErrorNotifier, WebsocketUnintentionalCloseNotifier} from '@gbraver-burst-network/browser-core';
import type {Stream} from "../../stream/core";
import {map} from "../../stream/operator";
import {toStream} from "../../stream/rxjs";
import type {WebSocketAPIError, WebSocketAPIUnintentionalClose} from '../actions/game-actions';

/**
 * ブラウザAPIからWebSocketAPIエラーストリームを生成する
 *
 * @param api ストリーム生成元のAPI
 * @return WebSocketAPIエラーストリーム
 */
export function toWebSocketAPIErrorStream(api: WebsocketErrorNotifier): Stream<WebSocketAPIError> {
  return toStream(api.websocketErrorNotifier())
    .chain(map(error => ({type: 'WebSocketAPIError', error})));
}

/**
 * ブラウザAPIから意図しないWebSocketAPI切断通知ストリームを生成する
 *
 * @param api ストリーム生成元のAPI
 * @return 意図しないWebSocketAPI切断通知ストリーム
 */
export function toWebSocketAPIUnintentionalCloseStream(api: WebsocketUnintentionalCloseNotifier): Stream<WebSocketAPIUnintentionalClose> {
  return toStream(api.websocketUnintentionalCloseNotifier())
    .chain(map(error => ({type: 'WebSocketAPIUnintentionalClose', error})));
}