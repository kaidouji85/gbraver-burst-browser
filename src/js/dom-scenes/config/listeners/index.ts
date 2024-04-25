import { Unsubscribable } from "rxjs";

import { inputDOMStream } from "../../../dom/input-dom";
import { domPushStream } from "../../../dom/push-dom";
import type { ConfigProps } from "../props";
import { onAcceptConfigChange } from "./on-accept-config-change";
import { onBGMVolumeChange } from "./on-bgm-volume-change";
import { onConfigChangeButtonPush } from "./on-config-change-button-push";
import { onDialogClose } from "./on-dialog-close";
import { onDiscardConfigChange } from "./on-discard-config-change";
import { onPrevButtonPush } from "./on-prev-button-push";
import { onSEVolumeChange } from "./on-se-volume-change";

/**
 * 設定画面にイベントリスナをバインドする
 *
 * @param props 画面プロパティ
 * @returns バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: ConfigProps): Unsubscribable[] {
  return [
    inputDOMStream(props.bgmVolumeSelector).subscribe((action) => {
      onBGMVolumeChange(props, action);
    }),
    inputDOMStream(props.seVolumeSelector).subscribe((action) => {
      onSEVolumeChange(props, action);
    }),
    domPushStream(props.prevButton).subscribe((action) => {
      onPrevButtonPush(props, action);
    }),
    domPushStream(props.configChangeButton).subscribe((action) => {
      onConfigChangeButtonPush(props, action);
    }),
    props.dialog.notifyClosed().subscribe(() => {
      onDialogClose(props);
    }),
    props.dialog.notifyDiscard().subscribe(() => {
      onDiscardConfigChange(props);
    }),
    props.dialog.notifyAcceptance().subscribe(() => {
      onAcceptConfigChange(props);
    }),
  ];
}
