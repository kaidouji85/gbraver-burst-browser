// @flow
import {pushDOMStream} from "../../../../../../dom/event-stream";
import type {Unsubscriber} from "../../../../../../stream/stream";
import type {ConfigChangedDialogProps} from "../props";
import {onAcceptPush} from "./on-accept-push";
import {onBackGroundPush} from "./on-back-ground-push";
import {onCloserPush} from "./on-closer-push";
import {onDiscardPush} from "./on-discard-push";

/**
 * ダイアログにイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: ConfigChangedDialogProps): Unsubscriber[] {
  return [
    pushDOMStream(props.backGround).subscribe(action => {
      onBackGroundPush(props, action);
    }),
    pushDOMStream(props.closer).subscribe(action => {
      onCloserPush(props, action);
    }),
    pushDOMStream(props.discard).subscribe(action => {
      onDiscardPush(props, action)
    }),
    pushDOMStream(props.accept).subscribe(action => {
      onAcceptPush(props, action);
    })
  ]
}