import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { PrivateMatchGuestDialogProps } from "../props";
import { disableAllControllers } from "./disable-all-controllers";

/**
 * QRコードリーダーボタンが押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onQrCodeReaderStart(
  props: PrivateMatchGuestDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    disableAllControllers(props);
    props.se.play(props.changeValue);
    await pop(props.startQRCodeReader, 1.07);
    await props.qrCodeReader.start();
  });
}
