import { pop } from "../../../dom/pop";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * QRコードリーダーボタンが押された時の処理
 * @param props ダイアログプロパティ
 */
export function onQrCodeReaderStart(props: PrivateMatchGuestDialogProps) {
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await pop(props.startQRCodeReader);
    await props.qrCodeReader.start();
  });
}
