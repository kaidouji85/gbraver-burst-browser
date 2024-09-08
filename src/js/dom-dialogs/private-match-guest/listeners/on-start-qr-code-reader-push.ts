import { pop } from "../../../dom/pop";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * QRコードリーダーボタンが押された時の処理
 * @param props ダイアログプロパティ
 */
export function onStartQrCodeReaderPush(props: PrivateMatchGuestDialogProps) {
  props.exclusive.execute(async () => {
    await pop(props.startQRCodeReader);
  });
}
