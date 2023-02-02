import { inputDOMStream, pushDOMStream } from "../../../dom/event-stream";
import type { Unsubscriber } from "../../../stream/stream";
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
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: ConfigProps): Unsubscriber[] {
  return [
    inputDOMStream(props.bgmVolumeSelector).subscribe((action) => {
      onBGMVolumeChange(props, action);
    }),
    inputDOMStream(props.seVolumeSelector).subscribe((action) => {
      onSEVolumeChange(props, action);
    }),
    pushDOMStream(props.prevButton).subscribe((action) => {
      onPrevButtonPush(props, action);
    }),
    pushDOMStream(props.configChangeButton).subscribe((action) => {
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
