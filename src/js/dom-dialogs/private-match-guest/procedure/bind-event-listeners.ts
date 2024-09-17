import { Unsubscribable } from "rxjs";

import { domClickStream, domPushStream } from "../../../dom/push-dom";
import { PrivateMatchGuestDialogProps } from "../props";
import { onCloserPush } from "./on-closer-push";
import { onEnterButtonPush } from "./on-enter-button-push";
import { onQRCodeRead } from "./on-qr-code-read";
import { onQrCodeReaderClose } from "./on-qr-code-reader-close";
import { onQrCodeReaderStart } from "./on-qr-code-reader-start";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: PrivateMatchGuestDialogProps,
): Unsubscribable[] {
  return [
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domClickStream(props.startQRCodeReader).subscribe((action) => {
      onQrCodeReaderStart(props, action);
    }),
    props.qrCodeReader.notifyReadQRCode().subscribe((roomID) => {
      onQRCodeRead(props, roomID);
    }),
    props.qrCodeReader.notifyClose().subscribe(() => {
      onQrCodeReaderClose(props);
    }),
    domPushStream(props.enterButton).subscribe((action) => {
      onEnterButtonPush(props, action);
    }),
  ];
}
